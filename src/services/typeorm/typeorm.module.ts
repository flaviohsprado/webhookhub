import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

export const getTypeOrmModuleOptions = (
   config: ConfigService,
): TypeOrmModuleOptions =>
   ({
      type: 'postgres',
      url: config.get('DATABASE_URL'),
      entities: ['dist/**/*.entity{.ts,.js}'],
      logging: ['query', 'error', 'schema', 'warn', 'info', 'log'],
      logger: 'advanced-console',
      entitySkipConstructor: true,
      synchronize: false,
      migrationsRun: false,
      dropSchema: false,
      verboseRetryLog: true,
      autoLoadEntities: true,
      ssl: {
         rejectUnauthorized: false
      },
      extra: {
         max: 100
      }
   }) as TypeOrmModuleOptions;

@Module({
   imports: [
      TypeOrmModule.forRootAsync({
         imports: [ConfigModule],
         inject: [ConfigService],
         useFactory: getTypeOrmModuleOptions,
      }),
   ],
})
export class TypeormModuleConfig { }