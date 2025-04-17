import { Tenant } from '../../tenants/entities/tenant.entity';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Invoice } from './invoice.entity'; // Import Invoice for relation

@Entity('receivers')
export class Receiver {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 13 })
  rfc: string; // RFC

  @Column({ length: 255 })
  name: string; // Nombre o Razón Social

  // --- Address Details (Required for CFDI 4.0) ---
  @Column({ length: 5 }) 
  zipCode: string; // Código Postal del domicilio fiscal del receptor

  // Add other address fields if needed (Street, City, State, Country etc.)
  // @Column({ length: 255, nullable: true })
  // street: string;
  // ...
  // --- End Address Details ---

  @Column({ length: 3 }) // Clave de UsoCFDI
  cfdiUse: string; // Uso CFDI (e.g., 'G01')

  @Column({ length: 3 }) // Clave del régimen fiscal del receptor
  taxRegime: string; // Régimen Fiscal Receptor (Required for CFDI 4.0)

  @Column({ unique: false, nullable: true }) // Email for sending invoice, not necessarily unique
  email: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  @OneToMany(() => Invoice, (invoice) => invoice.receiver) // Relation to Invoices
  invoices: Invoice[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 