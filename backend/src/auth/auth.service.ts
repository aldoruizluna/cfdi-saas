import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validates user credentials.
   * @param email User's email
   * @param pass Plain text password
   * @returns User object without password if valid, otherwise null.
   */
  async validateUser(email: string, pass: string): Promise<Omit<User, 'password'> | null> {
    const user = await this.usersService.findOneByEmail(email);
    
    // Check if user exists and password is correct
    if (user && await bcrypt.compare(pass, user.password)) {
      const { password, ...result } = user; // Exclude password from result
      return result;
    }
    return null;
  }

  /**
   * Generates a JWT for a given user.
   * @param user User object (typically after validation)
   * @returns An object containing the access token.
   */
  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id }; // Customize payload as needed
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Optional: Add a registration method here if needed
  // async register(userData: CreateUserDto): Promise<User> { ... }
} 