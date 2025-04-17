// backend/src/users/dto/create-user.dto.ts

// Basic DTO - Add validation decorators (e.g., from class-validator) later
export class CreateUserDto {
  email: string;
  password: string;
  name: string;
  tenantId: string;
  // Add other fields as needed for registration
} 