import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TenantsService } from './tenants.service';
import { Tenant } from './entities/tenant.entity';
// import { TenantsController } from './tenants.controller'; // Optional: Add if needed

@Module({
  imports: [TypeOrmModule.forFeature([Tenant])],
  providers: [TenantsService],
  // controllers: [TenantsController], // Optional
  exports: [TenantsService], // Export service if needed by other modules
})
export class TenantsModule {} 