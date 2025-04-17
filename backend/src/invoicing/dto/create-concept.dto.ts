// backend/src/invoicing/dto/create-concept.dto.ts

// Add validation decorators later (e.g., @IsString(), @IsNumber(), @Min(), etc.)
export class CreateConceptDto {
  productServiceKey: string;
  sku?: string;
  quantity: number;
  unitKey: string;
  unitName?: string;
  description: string;
  unitPrice: number;
  discount?: number;
  taxObject: string;

  // Simplified tax inputs for now
  vatTransferredRate?: number; // e.g., 0.16, 0.08, 0.00
  // We will calculate amounts in the service based on these inputs
  // Add inputs for other taxes (withheld, IEPS) if needed
} 