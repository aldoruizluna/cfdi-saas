import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TenantsModule } from './tenants/tenants.module';
import { InvoicingModule } from './invoicing/invoicing.module';

@Module({
  imports: [
    ConfigModule.forRoot({ 
      isGlobal: true, // Make ConfigModule global 
      envFilePath: '.env', // Specify the .env file path
    }), 
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule], // Import ConfigModule here
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [], // Define entities later
        autoLoadEntities: true, // Automatically load entities (requires entities to be defined elsewhere)
        synchronize: true, // DEV ONLY: Automatically creates schema. DO NOT USE IN PROD.
      }),
      inject: [ConfigService], // Inject ConfigService
    }),
    AuthModule,
    UsersModule,
    TenantsModule,
    InvoicingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {} 