// backend/data-source.ts
import 'dotenv/config'; // Load .env file for CLI
import { DataSource, DataSourceOptions } from 'typeorm';
import { User } from './src/users/entities/user.entity';
import { Tenant } from './src/tenants/entities/tenant.entity';
import { Invoice } from './src/invoicing/entities/invoice.entity';
import { Issuer } from './src/invoicing/entities/issuer.entity';
import { Receiver } from './src/invoicing/entities/receiver.entity';
import { Concept } from './src/invoicing/entities/concept.entity';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'db',
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || 'cfdi_saas_user',
  password: process.env.DATABASE_PASSWORD || 'supersecretdevpassword',
  database: process.env.DATABASE_NAME || 'cfdi_saas_dev',
  entities: [
    'src/users/entities/user.entity.ts', 
    'src/tenants/entities/tenant.entity.ts', 
    'src/invoicing/entities/invoice.entity.ts', 
    'src/invoicing/entities/issuer.entity.ts', 
    'src/invoicing/entities/receiver.entity.ts', 
    'src/invoicing/entities/concept.entity.ts'
  ],
  // Specify migrations path
  migrations: ['src/db/migrations/*{.ts,.js}'], 
  synchronize: false, // IMPORTANT: Disable synchronize for migrations
  logging: true, // Enable logging for CLI operations
};

export const AppDataSource = new DataSource(options); 