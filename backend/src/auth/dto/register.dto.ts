// backend/src/auth/dto/register.dto.ts

// Add validation decorators later (e.g., @IsString(), @IsEmail(), @MinLength())
export class RegisterDto {
  // User fields
  name: string;
  email: string;
  password: string;

  // Tenant field
  tenantName: string;
} 