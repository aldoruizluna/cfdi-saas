import { Controller, Post, UseGuards, Request, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard'; // We will create this
import { JwtAuthGuard } from './guards/jwt-auth.guard'; // We will create this
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto'; // Import new DTO
import { TenantsService } from '../tenants/tenants.service'; // Import TenantsService
import { ConflictException } from '@nestjs/common'; // Import exception

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService,
    private tenantsService: TenantsService, // Inject TenantsService
  ) {}

  // Use LocalAuthGuard to validate credentials based on LocalStrategy
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    // If LocalAuthGuard passes, req.user contains the validated user object (from LocalStrategy.validate)
    return this.authService.login(req.user);
  }

  // Updated registration endpoint
  @Post('register')
  async register(@Body() registerDto: RegisterDto) { 
    // Potential improvement: Use a transaction to ensure atomicity
    try {
      // 1. Create the Tenant
      const newTenant = await this.tenantsService.create({ name: registerDto.tenantName });
      
      // 2. Prepare User data with the new tenantId
      const userToCreate = {
        name: registerDto.name,
        email: registerDto.email,
        password: registerDto.password,
        tenantId: newTenant.id,
      };

      // 3. Create the User
      const newUser = await this.usersService.create(userToCreate);

      // Exclude password from the response
      const { password, ...result } = newUser;
      return result;

    } catch (error) {
        // Basic error handling (e.g., duplicate email)
        if (error?.code === '23505') { // Check for PostgreSQL unique violation code
             throw new ConflictException('Email already exists');
        }
        // TODO: Handle potential tenant creation errors more specifically
        // TODO: Consider deleting created tenant if user creation fails (or use transaction)
        throw error; // Re-throw other errors
    }
  }

  // Example of a protected route
  @UseGuards(JwtAuthGuard)
  @Post('profile') // Changed from Get to Post as Get usually doesn't have a body, but depends on use case
  getProfile(@Request() req) {
    // req.user is populated by JwtStrategy.validate
    return req.user; 
  }
} 