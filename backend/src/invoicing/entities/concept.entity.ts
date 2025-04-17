import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Invoice } from './invoice.entity'; // Import Invoice for relation

// TODO: Define Tax structure if needed more formally (e.g., separate entity or JSON column)

@Entity('concepts')
export class Concept {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Invoice, (invoice) => invoice.concepts, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'invoiceId' })
  invoice: Invoice;

  @Column()
  invoiceId: string;

  @Column({ length: 10 }) // ClaveProdServ
  productServiceKey: string; // Clave Producto/Servicio SAT (e.g., '84111506')

  @Column({ length: 20, nullable: true }) // NoIdentificacion
  sku: string; // Optional: Internal SKU or identifier

  @Column('decimal', { precision: 18, scale: 6 }) // Cantidad
  quantity: number;

  @Column({ length: 20 }) // ClaveUnidad
  unitKey: string; // Clave Unidad SAT (e.g., 'E48')

  @Column({ length: 100, nullable: true }) // Unidad
  unitName: string; // Optional: Name of the unit (e.g., 'Servicio', 'Pieza')

  @Column('text') // Descripcion
  description: string;

  @Column('decimal', { precision: 18, scale: 6 }) // ValorUnitario
  unitPrice: number;

  @Column('decimal', { precision: 18, scale: 6 }) // Importe (Quantity * UnitPrice)
  amount: number;

  @Column('decimal', { precision: 18, scale: 6, default: 0 }) // Descuento
  discount: number; // Optional discount amount for this line item

  @Column({ length: 2 }) // ObjetoImp
  taxObject: string; // SAT Tax Object Key (e.g., '01' No objeto de impuesto, '02' Sí objeto de impuesto)

  // --- Taxes --- 
  // Simple approach: Store aggregated tax amounts per concept. 
  // A more complex approach might use a separate Tax entity or JSON column.
  
  @Column('decimal', { precision: 16, scale: 6, default: 0 })
  vatTransferredAmount: number; // Sum of VAT Transferred for this concept
  
  @Column('decimal', { precision: 10, scale: 6, nullable: true }) // TasaOCuota (for VAT)
  vatTransferredRate: number; // The rate used (e.g., 0.16, 0.08, 0.00). Nullable if exempt.

  @Column('decimal', { precision: 16, scale: 6, default: 0 })
  vatWithheldAmount: number; // Sum of VAT Withheld for this concept

  @Column('decimal', { precision: 16, scale: 6, default: 0 })
  isrWithheldAmount: number; // Sum of ISR Withheld for this concept

  @Column('decimal', { precision: 16, scale: 6, default: 0 })
  iepsTransferredAmount: number; // Sum of IEPS Transferred for this concept
  // ... add other potential taxes (withheld IEPS, local taxes) if needed
  // --- End Taxes ---

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
} 