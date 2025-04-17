import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Tenant } from '../tenants/entities/tenant.entity'; // Import Tenant entity

@Entity('users') // Specifies the table name
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @Column({ length: 255 })
  name: string;

  @Column({ select: false }) // Exclude password by default when selecting users
  password: string;

  // --- Tenant Relationship --- 
  @Column()
  tenantId: string; // Foreign key column

  @ManyToOne(() => Tenant, (tenant) => tenant.users, { 
    onDelete: 'CASCADE' // Optional: Delete user if tenant is deleted
  }) 
  @JoinColumn({ name: 'tenantId' }) // Specify the foreign key column name
  tenant: Tenant;
  // --- End Tenant Relationship ---

  // TODO: Add roles, tenant relations, etc. later

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  // We will add methods for password hashing/comparison later in the UserService/AuthService
} 