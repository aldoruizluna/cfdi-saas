import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Concept } from './entities/concept.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Issuer } from './entities/issuer.entity';
import { Receiver } from './entities/receiver.entity';

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private invoicesRepository: Repository<Invoice>,
    // Inject other repositories if needed for validation (e.g., Issuer, Receiver)
    @InjectRepository(Issuer)
    private issuersRepository: Repository<Issuer>,
    @InjectRepository(Receiver)
    private receiversRepository: Repository<Receiver>,
  ) {}

  // --- Helper to verify entity ownership --- 
  private async verifyTenantAccess(entityRepo: Repository<any>, entityId: string, tenantId: string): Promise<void> {
    const entity = await entityRepo.findOne({ where: { id: entityId, tenantId: tenantId } });
    if (!entity) {
        throw new ForbiddenException(`Access denied or entity not found.`);
    }
  }

  async create(createInvoiceDto: CreateInvoiceDto, tenantId: string): Promise<Invoice> {
    // 1. Verify Issuer and Receiver belong to the tenant
    await this.verifyTenantAccess(this.issuersRepository, createInvoiceDto.issuerId, tenantId);
    await this.verifyTenantAccess(this.receiversRepository, createInvoiceDto.receiverId, tenantId);

    // 2. Calculate amounts for concepts and invoice totals
    let subtotal = 0;
    const conceptsData = createInvoiceDto.concepts.map(conceptDto => {
        const amount = conceptDto.quantity * conceptDto.unitPrice;
        const discount = conceptDto.discount || 0;
        const baseForVat = (amount - discount);
        // Basic VAT calculation (can be expanded for other taxes)
        const vatTransferredAmount = conceptDto.taxObject === '02' && conceptDto.vatTransferredRate != null 
            ? baseForVat * conceptDto.vatTransferredRate
            : 0;

        subtotal += amount - discount; // Accumulate concept amounts (before taxes)

        return {
            ...conceptDto,
            amount: amount,
            discount: discount,
            vatTransferredAmount: vatTransferredAmount,
            // Calculate other taxes here if needed
        } as Concept; // Cast to Concept entity type (or create instances)
    });

    const totalDiscount = createInvoiceDto.discount || 0;
    const totalVatTransferred = conceptsData.reduce((sum, c) => sum + (c.vatTransferredAmount || 0), 0);
    // Calculate total based on subtotal, discounts, and taxes
    const total = subtotal - totalDiscount + totalVatTransferred; // Add other taxes here

    // 3. Create Invoice entity
    const invoice = this.invoicesRepository.create({
        ...createInvoiceDto,
        tenantId,
        concepts: conceptsData, // Assign processed concepts
        subtotal: subtotal,
        discount: totalDiscount,
        total: total,
        status: InvoiceStatus.DRAFT, // Initial status
        date: new Date(createInvoiceDto.date), // Convert date string to Date object
    });

    return this.invoicesRepository.save(invoice);
  }

  async findAll(tenantId: string): Promise<Invoice[]> {
    return this.invoicesRepository.find({
      where: { tenantId },
      relations: ['issuer', 'receiver'], // Load basic relations for list view
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string, tenantId: string): Promise<Invoice> {
    const invoice = await this.invoicesRepository.findOne({
      where: { id, tenantId },
      relations: ['issuer', 'receiver', 'concepts'], // Load all relations for detail view
    });
    if (!invoice) {
      throw new NotFoundException(`Invoice with ID "${id}" not found`);
    }
    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto, tenantId: string): Promise<Invoice> {
    const invoice = await this.findOne(id, tenantId); // Ensures tenant access and existence

    // Prevent updating certain fields if invoice is not in draft status (example)
    if (invoice.status !== InvoiceStatus.DRAFT) {
      throw new ForbiddenException('Cannot update an invoice that is not in draft status.');
    }

    // TODO: Recalculate totals if concepts or amounts change significantly.
    // For simplicity, we are currently just merging the data.
    // Consider how to handle concept updates/additions/removals.
    
    // Verify new Issuer/Receiver if changed
    if (updateInvoiceDto.issuerId && updateInvoiceDto.issuerId !== invoice.issuerId) {
        await this.verifyTenantAccess(this.issuersRepository, updateInvoiceDto.issuerId, tenantId);
    }
    if (updateInvoiceDto.receiverId && updateInvoiceDto.receiverId !== invoice.receiverId) {
        await this.verifyTenantAccess(this.receiversRepository, updateInvoiceDto.receiverId, tenantId);
    }

    // TypeORM's save method can handle updates if the entity has an ID.
    // Merge the changes from DTO into the loaded invoice entity.
    const updatedInvoiceData = this.invoicesRepository.merge(invoice, updateInvoiceDto);

    // Explicitly handle date conversion if it's provided in the DTO
    if (updateInvoiceDto.date) {
        updatedInvoiceData.date = new Date(updateInvoiceDto.date);
    }

    // TODO: Handle concept updates more robustly (currently not implemented)
    // If updateInvoiceDto.concepts is provided, you might need to remove old concepts 
    // and create new ones based on the DTO.

    return this.invoicesRepository.save(updatedInvoiceData);
  }

  async remove(id: string, tenantId: string): Promise<void> {
    const invoice = await this.findOne(id, tenantId); // Ensures tenant access and existence

    // Add logic here: only allow deletion if status is DRAFT?
    if (invoice.status !== InvoiceStatus.DRAFT) {
       throw new ForbiddenException(`Cannot delete invoice with status: ${invoice.status}`);
    }

    const result = await this.invoicesRepository.delete({ id, tenantId });
    if (result.affected === 0) {
      throw new NotFoundException(`Invoice with ID "${id}" not found`);
    }
  }
} 