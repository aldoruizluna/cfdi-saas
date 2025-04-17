import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/entities/user.entity';
import * as bcrypt from 'bcrypt';

// Mock bcrypt functions
jest.mock('bcrypt');

// Mock UsersService
const mockUsersService = {
  findOneByEmail: jest.fn(),
};

// Mock JwtService
const mockJwtService = {
  sign: jest.fn(),
};

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    // Reset mocks before each test
    jest.clearAllMocks();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Tests for validateUser --- 
  describe('validateUser', () => {
    const email = 'test@example.com';
    const password = 'password123';
    const hashedPassword = 'hashedPassword';
    const user = { id: 'uuid', email, password: hashedPassword, name: 'Test User' } as User;

    it('should return user without password if validation succeeds', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true); // Mock password comparison success

      const result = await service.validateUser(email, password);

      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toEqual({ id: user.id, email: user.email, name: user.name });
    });

    it('should return null if user not found', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(undefined);

      const result = await service.validateUser(email, password);

      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).not.toHaveBeenCalled();
      expect(result).toBeNull();
    });

    it('should return null if password does not match', async () => {
      mockUsersService.findOneByEmail.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false); // Mock password comparison failure

      const result = await service.validateUser(email, password);

      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith(email);
      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBeNull();
    });
  });

  // --- Tests for login --- 
  describe('login', () => {
    const user = { id: 'uuid', email: 'test@example.com', name: 'Test User' };
    const token = 'jwt-token';

    it('should return an access token', async () => {
      mockJwtService.sign.mockReturnValue(token);
      const payload = { email: user.email, sub: user.id };

      const result = await service.login(user as User); // Cast needed as login expects User without password

      expect(mockJwtService.sign).toHaveBeenCalledWith(payload);
      expect(result).toEqual({ access_token: token });
    });
  });
}); 