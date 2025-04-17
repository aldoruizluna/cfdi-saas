import { PartialType } from '@nestjs/mapped-types'; // Use mapped-types for partial updates
import { CreateInvoiceDto } from './create-invoice.dto';
import { CreateConceptDto } from './create-concept.dto'; // Import this too

// Makes all fields from CreateInvoiceDto optional
// Add validation later
export class UpdateInvoiceDto extends PartialType(CreateInvoiceDto) {
  // Explicitly declare potentially updated fields to satisfy stricter type checking
  // even though PartialType makes them optional.
  issuerId?: string;
  receiverId?: string;
  date?: string; // ISO 8601 date string
  concepts?: CreateConceptDto[]; // Allow updating concepts (needs handling in service)
  // You can add specific fields here if they differ from CreateInvoiceDto 
  // or require different validation rules for update operations.
  // For example, maybe status changes have a specific endpoint/DTO.
} 