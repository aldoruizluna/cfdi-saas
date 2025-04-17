import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOneByEmail(email: string): Promise<User | undefined> {
    // Fetch user including the password field and tenant relation
    return this.usersRepository.findOne({
      where: { email },
      relations: ['tenant'], // Load the tenant relation
      select: ['id', 'email', 'name', 'password', 'tenantId', 'createdAt', 'updatedAt'], // Explicitly select password and tenantId
    });
  }

  // Add method to find user by ID and load tenant relation
  async findOneByIdWithTenant(id: string): Promise<User | undefined> {
    return this.usersRepository.findOne({
        where: { id },
        relations: ['tenant'], // Ensure tenant is loaded
        select: ['id', 'email', 'name', 'tenantId', 'createdAt', 'updatedAt'], // Explicitly select needed fields, exclude password
    });
  }

  // Updated create method to use DTO and associate tenantId
  async create(createUserDto: CreateUserDto): Promise<User> {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(createUserDto.password, salt);
    
    const newUser = this.usersRepository.create({
        ...createUserDto,
        password: hashedPassword, // Use the hashed password
        // tenantId is already in createUserDto
    });
    
    return this.usersRepository.save(newUser);
  }

  // Add other methods like findById, update, delete as needed
} 