import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' }); // Use 'email' instead of default 'username'
  }

  /**
   * Passport first verifies the credentials (email, password) using this method.
   * It then calls the login() method in AuthController if validation succeeds.
   * @param email 
   * @param password 
   * @returns The user object (without password) if validation is successful.
   * @throws UnauthorizedException if validation fails.
   */
  async validate(email: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user; // This gets attached to req.user in the controller
  }
} 