import { Module } from '@nestjs/common';
import { IntegrationService } from './integration.service';
import { IntegrationResolver } from './integration.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Integrations } from './entities/integration.entity';

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [Integrations] })],
  providers: [IntegrationResolver, IntegrationService],
})
export class IntegrationModule {}
