import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service'; // Import UsersService

// Define the shape of the JWT payload from the token
export interface JwtTokenPayload {
  email: string;
  sub: string; // User ID
}

// Define the shape of the user object attached to the request
export interface RequestUser {
  id: string;
  email: string;
  tenantId: string; // Include tenantId
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private usersService: UsersService, // Inject UsersService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }

  /**
   * This method is called after the token is verified.
   * Fetches the user from DB and attaches user info (including tenantId) to request.user
   * @param payload The decoded JWT payload (JwtTokenPayload)
   */
  async validate(payload: JwtTokenPayload): Promise<RequestUser> {
    // Find user by ID from token, ensure tenant relation is loaded
    const user = await this.usersService.findOneByIdWithTenant(payload.sub); 

    if (!user) {
      throw new UnauthorizedException('User not found or invalid token');
    }
    if (!user.tenantId) {
        // This should ideally not happen if users are always created with tenants
        throw new UnauthorizedException('User is not associated with a tenant.');
    }

    // Return the essential user info to be attached to req.user
    return { 
        id: user.id,
        email: user.email,
        tenantId: user.tenantId 
    };
  }
} 