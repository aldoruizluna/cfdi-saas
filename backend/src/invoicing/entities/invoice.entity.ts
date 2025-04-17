import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Tenant } from '../../tenants/entities/tenant.entity';
import { Issuer } from './issuer.entity';
import { Receiver } from './receiver.entity';
import { Concept } from './concept.entity';

export enum InvoiceStatus {
  DRAFT = 'draft',
  STAMPED = 'stamped', // Timbrado
  CANCELLED = 'cancelled',
  ERROR = 'error',
}

@Entity('invoices')
export class Invoice {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  tenantId: string;

  @ManyToOne(() => Tenant, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'tenantId' })
  tenant: Tenant;

  // --- Relationships --- 
  @Column()
  issuerId: string;

  @ManyToOne(() => Issuer, (issuer) => issuer.invoices, { eager: true }) // Eager load issuer info
  @JoinColumn({ name: 'issuerId' })
  issuer: Issuer;

  @Column()
  receiverId: string;

  @ManyToOne(() => Receiver, (receiver) => receiver.invoices, { eager: true }) // Eager load receiver info
  @JoinColumn({ name: 'receiverId' })
  receiver: Receiver;

  @OneToMany(() => Concept, (concept) => concept.invoice, { cascade: true, eager: true }) // Cascade persist/update/remove concepts, Eager load concepts
  concepts: Concept[];
  // --- End Relationships ---

  // --- Core CFDI Fields ---
  @Column({ length: 25, nullable: true }) // Serie
  series: string;

  @Column({ length: 40, nullable: true }) // Folio
  folio: string;

  @Column('timestamp with time zone') // Fecha
  date: Date;

  @Column({ length: 2 }) // FormaPago
  paymentMethod: string; // e.g., '01' Efectivo, '03' Transferencia

  @Column({ length: 3 }) // Moneda
  currency: string; // e.g., 'MXN', 'USD'

  @Column('decimal', { precision: 10, scale: 6, default: 1.000000 }) // TipoCambio
  exchangeRate: number;

  @Column('decimal', { precision: 18, scale: 6 }) // SubTotal
  subtotal: number;

  @Column('decimal', { precision: 18, scale: 6, default: 0 }) // Descuento
  discount: number;

  @Column('decimal', { precision: 18, scale: 6 }) // Total
  total: number;

  @Column({ length: 3 }) // TipoDeComprobante
  voucherType: string; // e.g., 'I' Ingreso, 'E' Egreso, 'T' Traslado

  @Column({ length: 2 }) // MetodoPago
  paymentType: string; // e.g., 'PUE' Pago en una sola exhibición, 'PPD' Pago en parcialidades o diferido

  @Column({ length: 5 }) // LugarExpedicion
  expeditionZipCode: string; // Código Postal del lugar de expedición (del emisor)
  
  @Column({ length: 2 }) // Exportacion
  exportType: string; // Clave Exportación SAT (e.g., '01' No aplica, '02' Definitiva)
  // --- End Core CFDI Fields ---

  // --- Stamping (Timbrado) Info ---
  @Column({ 
    type: 'enum',
    enum: InvoiceStatus,
    default: InvoiceStatus.DRAFT,
  })
  status: InvoiceStatus;

  @Column({ nullable: true }) // UUID del CFDI timbrado
  uuid: string; 

  @Column('text', { nullable: true }) // XML generado y timbrado
  xml: string;
  
  @Column('text', { nullable: true }) // Representation of the PDF
  pdfUrl: string; // URL or path to the generated PDF

  @Column('text', { nullable: true }) // Mensajes de error del PAC o validación
  errorMessage: string;

  @Column('timestamp with time zone', { nullable: true })
  stampedAt: Date;

  @Column('timestamp with time zone', { nullable: true })
  cancelledAt: Date;
  // --- End Stamping Info ---

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 