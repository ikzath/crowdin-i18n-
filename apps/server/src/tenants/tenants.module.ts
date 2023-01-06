import { Module } from '@nestjs/common';
import { TenantsService } from './tenants.service';
import { TenantsResolver } from './tenants.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tenant } from './entities/tenant.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Tenant] })],
  providers: [TenantsResolver, TenantsService],
  exports: [TenantsService],
})
export class TenantsModule {}
