import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

// Mock bcrypt
jest.mock('bcrypt');

// Mock TypeORM repository
const mockUserRepository = {
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
};

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Tests for findOneByEmail ---
  describe('findOneByEmail', () => {
    it('should find a user by email with password selected', async () => {
      const email = 'test@example.com';
      const user = { id: 'uuid', email } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOneByEmail(email);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { email },
        relations: ['tenant'], // Verify relation loading
        select: ['id', 'email', 'name', 'password', 'tenantId', 'createdAt', 'updatedAt'], // Verify password selection
      });
      expect(result).toEqual(user);
    });

    it('should return undefined if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(undefined);
      const result = await service.findOneByEmail('notfound@example.com');
      expect(result).toBeUndefined();
    });
  });

  // --- Tests for findOneByIdWithTenant ---
  describe('findOneByIdWithTenant', () => {
    it('should find a user by id and load tenant', async () => {
      const id = 'user-uuid';
      const user = { id, email: 'test@example.com' } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.findOneByIdWithTenant(id);

      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id },
        relations: ['tenant'],
        select: ['id', 'email', 'name', 'tenantId', 'createdAt', 'updatedAt'],
      });
      expect(result).toEqual(user);
    });
  });

  // --- Tests for create ---
  describe('create', () => {
    it('should create a new user, hash password, and save', async () => {
      const createUserDto: CreateUserDto = {
        email: 'new@example.com',
        password: 'password123',
        name: 'New User',
        tenantId: 'tenant-uuid',
      };
      const hashedPassword = 'hashedPassword';
      const createdUser = { id: 'new-uuid', ...createUserDto, password: hashedPassword } as User;
      const savedUser = { ...createdUser, createdAt: new Date(), updatedAt: new Date() };

      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserRepository.create.mockReturnValue(createdUser); // Mock the result of repository.create
      mockUserRepository.save.mockResolvedValue(savedUser); // Mock the result of repository.save

      const result = await service.create(createUserDto);

      expect(bcrypt.genSalt).toHaveBeenCalled();
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 'salt');
      expect(mockUserRepository.create).toHaveBeenCalledWith({
        ...createUserDto,
        password: hashedPassword,
      });
      expect(mockUserRepository.save).toHaveBeenCalledWith(createdUser);
      expect(result).toEqual(savedUser);
    });
  });
}); 