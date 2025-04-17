import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InvoicesService } from './invoices.service';
import { Invoice, InvoiceStatus } from './entities/invoice.entity';
import { Issuer } from './entities/issuer.entity';
import { Receiver } from './entities/receiver.entity';
import { Concept } from './entities/concept.entity';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ForbiddenException, NotFoundException } from '@nestjs/common';

// Mocks
const mockInvoiceRepository = {
  create: jest.fn(),
  save: jest.fn(),
  find: jest.fn(),
  findOne: jest.fn(),
  delete: jest.fn(),
  merge: jest.fn(),
};
const mockIssuerRepository = {
  findOne: jest.fn(),
};
const mockReceiverRepository = {
  findOne: jest.fn(),
};

describe('InvoicesService', () => {
  let service: InvoicesService;
  let invoiceRepository: Repository<Invoice>;
  let issuerRepository: Repository<Issuer>;
  let receiverRepository: Repository<Receiver>;

  const tenantId = 'tenant-uuid-123';
  const issuerId = 'issuer-uuid-456';
  const receiverId = 'receiver-uuid-789';

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InvoicesService,
        { provide: getRepositoryToken(Invoice), useValue: mockInvoiceRepository },
        { provide: getRepositoryToken(Issuer), useValue: mockIssuerRepository },
        { provide: getRepositoryToken(Receiver), useValue: mockReceiverRepository },
      ],
    }).compile();

    service = module.get<InvoicesService>(InvoicesService);
    invoiceRepository = module.get<Repository<Invoice>>(getRepositoryToken(Invoice));
    issuerRepository = module.get<Repository<Issuer>>(getRepositoryToken(Issuer));
    receiverRepository = module.get<Repository<Receiver>>(getRepositoryToken(Receiver));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  // --- Tests for create ---
  describe('create', () => {
    const createInvoiceDto: CreateInvoiceDto = {
      issuerId: issuerId,
      receiverId: receiverId,
      date: new Date().toISOString(),
      paymentMethod: '03',
      currency: 'MXN',
      voucherType: 'I',
      paymentType: 'PUE',
      expeditionZipCode: '12345',
      exportType: '01',
      concepts: [
        { productServiceKey: '84111506', quantity: 1, unitKey: 'E48', description: 'Service 1', unitPrice: 100, taxObject: '02', vatTransferredRate: 0.16 },
        { productServiceKey: '84111507', quantity: 2, unitKey: 'E48', description: 'Service 2', unitPrice: 50, discount: 10, taxObject: '02', vatTransferredRate: 0.16 },
      ],
    };
    const mockIssuer = { id: issuerId, tenantId: tenantId } as Issuer;
    const mockReceiver = { id: receiverId, tenantId: tenantId } as Receiver;

    it('should create and save an invoice with calculated totals', async () => {
      mockIssuerRepository.findOne.mockResolvedValue(mockIssuer); // Simulate finding valid issuer
      mockReceiverRepository.findOne.mockResolvedValue(mockReceiver); // Simulate finding valid receiver
      
      // Mock the creation and saving process
      mockInvoiceRepository.create.mockImplementation((invoiceData) => invoiceData); // Return input data
      mockInvoiceRepository.save.mockImplementation(async (invoiceData) => ({ // Simulate saved entity
        ...invoiceData,
        id: 'invoice-uuid-new',
        createdAt: new Date(),
        updatedAt: new Date(),
      }));

      const result = await service.create(createInvoiceDto, tenantId);

      // Verifications
      expect(mockIssuerRepository.findOne).toHaveBeenCalledWith({ where: { id: issuerId, tenantId: tenantId } });
      expect(mockReceiverRepository.findOne).toHaveBeenCalledWith({ where: { id: receiverId, tenantId: tenantId } });
      expect(mockInvoiceRepository.create).toHaveBeenCalled();
      expect(mockInvoiceRepository.save).toHaveBeenCalled();

      // Check calculations (Concept 1: 1*100=100, VAT=16; Concept 2: 2*50=100, Disc=10, Base=90, VAT=14.4)
      expect(result.subtotal).toBeCloseTo(100 + 90); // 190
      expect(result.total).toBeCloseTo(190 + 16 + 14.4); // 220.4
      expect(result.concepts[0].amount).toBeCloseTo(100);
      expect(result.concepts[0].vatTransferredAmount).toBeCloseTo(16);
      expect(result.concepts[1].amount).toBeCloseTo(100);
      expect(result.concepts[1].discount).toBeCloseTo(10);
      expect(result.concepts[1].vatTransferredAmount).toBeCloseTo(14.4);
      expect(result.tenantId).toBe(tenantId);
      expect(result.status).toBe(InvoiceStatus.DRAFT);
    });

    it('should throw ForbiddenException if issuer does not belong to tenant', async () => {
      mockIssuerRepository.findOne.mockResolvedValue(undefined); // Issuer not found for this tenant
      mockReceiverRepository.findOne.mockResolvedValue(mockReceiver);

      await expect(service.create(createInvoiceDto, tenantId)).rejects.toThrow(ForbiddenException);
    });

    it('should throw ForbiddenException if receiver does not belong to tenant', async () => {
      mockIssuerRepository.findOne.mockResolvedValue(mockIssuer);
      mockReceiverRepository.findOne.mockResolvedValue(undefined); // Receiver not found for this tenant

      await expect(service.create(createInvoiceDto, tenantId)).rejects.toThrow(ForbiddenException);
    });
  });

  // --- Tests for findOne ---
  describe('findOne', () => {
    const invoiceId = 'inv-uuid-111';
    const mockInvoice = { id: invoiceId, tenantId: tenantId } as Invoice;

    it('should find and return an invoice by id for the correct tenant', async () => {
      mockInvoiceRepository.findOne.mockResolvedValue(mockInvoice);

      const result = await service.findOne(invoiceId, tenantId);

      expect(mockInvoiceRepository.findOne).toHaveBeenCalledWith({
        where: { id: invoiceId, tenantId: tenantId },
        relations: ['issuer', 'receiver', 'concepts'],
      });
      expect(result).toEqual(mockInvoice);
    });

    it('should throw NotFoundException if invoice not found for the tenant', async () => {
      mockInvoiceRepository.findOne.mockResolvedValue(undefined);

      await expect(service.findOne(invoiceId, tenantId)).rejects.toThrow(NotFoundException);
    });
  });

  // --- TODO: Add tests for findAll, update, remove similar to above ---
}); 