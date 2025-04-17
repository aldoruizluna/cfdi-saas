import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { InvoicesService } from './invoices.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

// Helper function to extract tenantId from request (assuming it's added by a guard/middleware)
// In a real app, this might come from a custom decorator or directly from req.user
const getTenantIdFromRequest = (req): string => {
  // TODO: Implement proper tenant extraction based on your auth setup
  // For now, assuming tenantId is directly on req.user after JWT validation and tenant loading
  if (!req.user?.tenantId) {
      throw new Error('Tenant ID not found on user object in request.');
  }
  return req.user.tenantId;
};

@UseGuards(JwtAuthGuard) // Protect all routes in this controller
@Controller('invoices')
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  create(@Body() createInvoiceDto: CreateInvoiceDto, @Request() req) {
    const tenantId = getTenantIdFromRequest(req);
    return this.invoicesService.create(createInvoiceDto, tenantId);
  }

  @Get()
  findAll(@Request() req) {
    const tenantId = getTenantIdFromRequest(req);
    return this.invoicesService.findAll(tenantId);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const tenantId = getTenantIdFromRequest(req);
    return this.invoicesService.findOne(id, tenantId);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
    @Request() req,
  ) {
    const tenantId = getTenantIdFromRequest(req);
    return this.invoicesService.update(id, updateInvoiceDto, tenantId);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string, @Request() req) {
    const tenantId = getTenantIdFromRequest(req);
    return this.invoicesService.remove(id, tenantId);
  }
} 