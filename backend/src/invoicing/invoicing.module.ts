import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { Issuer } from './entities/issuer.entity';
import { Receiver } from './entities/receiver.entity';
import { Concept } from './entities/concept.entity';
import { InvoicesService } from './invoices.service';
import { InvoicesController } from './invoices.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Invoice,
      Issuer,
      Receiver,
      Concept,
    ]),
  ],
  controllers: [InvoicesController],
  providers: [InvoicesService],
  exports: [InvoicesService]
})
export class InvoicingModule {} 