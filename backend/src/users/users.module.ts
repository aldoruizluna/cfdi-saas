import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // Import User entity repository
  providers: [UsersService],
  exports: [UsersService], // Export service for other modules (like AuthModule)
})
export class UsersModule {} 