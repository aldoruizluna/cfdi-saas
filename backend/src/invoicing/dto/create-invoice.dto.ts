import { CreateConceptDto } from './create-concept.dto';

// Add validation decorators later (e.g., @IsUUID(), @IsString(), @IsArray(), @ValidateNested(), etc.)
export class CreateInvoiceDto {
  issuerId: string;
  receiverId: string;
  series?: string;
  folio?: string;
  date: string; // Use ISO 8601 date string format (e.g., "2023-10-27T10:00:00Z")
  paymentMethod: string;
  currency: string;
  exchangeRate?: number;
  voucherType: string;
  paymentType: string;
  expeditionZipCode: string;
  exportType: string;
  discount?: number;

  // Array of concepts
  concepts: CreateConceptDto[];
} 