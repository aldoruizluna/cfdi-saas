// backend/data-source.ts
import 'dotenv/config'; // Load .env file for CLI
import { DataSource, DataSourceOptions } from 'typeorm';
import * as path from 'path'; // Import path module

// Import entities normally for type checking
import { User } from './src/users/entities/user.entity';
import { Tenant } from './src/tenants/entities/tenant.entity';
import { Invoice } from './src/invoicing/entities/invoice.entity';
import { Issuer } from './src/invoicing/entities/issuer.entity';
import { Receiver } from './src/invoicing/entities/receiver.entity';
import { Concept } from './src/invoicing/entities/concept.entity';

const options: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost', // Keep localhost for CLI
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME || 'cfdi_saas_user',
  password: process.env.DATABASE_PASSWORD || 'supersecretdevpassword',
  database: process.env.DATABASE_NAME || 'cfdi_saas_dev',
  // Reference entities using absolute paths derived from __dirname
  entities: [
    path.join(__dirname, '/src/users/entities/user.entity{.ts,.js}'),
    path.join(__dirname, '/src/tenants/entities/tenant.entity{.ts,.js}'),
    path.join(__dirname, '/src/invoicing/entities/invoice.entity{.ts,.js}'),
    path.join(__dirname, '/src/invoicing/entities/issuer.entity{.ts,.js}'),
    path.join(__dirname, '/src/invoicing/entities/receiver.entity{.ts,.js}'),
    path.join(__dirname, '/src/invoicing/entities/concept.entity{.ts,.js}')
  ],
  // Use path.join for migrations path
  migrations: [path.join(__dirname, '/src/db/migrations/*{.ts,.js}')], 
  synchronize: false, // IMPORTANT: Disable synchronize for migrations
  logging: true, // Enable logging for CLI operations
};

export const AppDataSource = new DataSource(options); 