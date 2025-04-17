import { Tenant } from '../../tenants/entities/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Invoice } from './invoice.entity'; // Import Invoice for relation

@Entity('issuers')
export class Issuer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 13 }) // RFC length (12 for companies, 13 for individuals)
  rfc: string;

  @Column({ length: 255 })
  name: string; // Nombre o Razón Social

  @Column({ length: 3 }) // Clave del régimen fiscal
  taxRegime: string; // Régimen Fiscal (e.g., '601')

  // Optional: Add Address details if needed separately from CFDI generation data
  // @Column({ nullable: true }) 
  // zipCode: string; 
  // ... other address fields ...

  @Column()
  tenantId: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @OneToMany(() => Invoice, (invoice) => invoice.issuer) // Relation to Invoices
  invoices: Invoice[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 