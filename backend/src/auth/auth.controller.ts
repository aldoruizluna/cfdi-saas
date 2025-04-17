import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; // We will create this
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // We will create this
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto'; // We will create this

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService, // Inject UsersService for registration
  ) {}

  // Use LocalAuthGuard to validate credentials based on LocalStrategy
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // If LocalAuthGuard passes, req.user contains the validated user object (from LocalStrategy.validate)
    return this.authService.login(req.user);
  }

  // Optional: Add a registration endpoint
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    // Basic registration - consider adding more validation, error handling, etc.
    const user = await this.usersService.create(createUserDto);
    // Optionally log the user in immediately after registration
    // const { password, ...result } = user;
    // return this.authService.login(result); 
    // Or just return success/user info (excluding password)
    const { password, ...result } = user;
    return result;
  }

  // Example of a protected route
  @UseGuards(JwtAuthGuard)
  @Post('profile') // Changed from Get to Post as Get usually doesn't have a body, but depends on use case
  getProfile(@Request() req) {
    // req.user is populated by JwtStrategy.validate
    return req.user; 
  }
} 