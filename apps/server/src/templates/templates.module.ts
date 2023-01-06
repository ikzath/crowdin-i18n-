import { Module } from '@nestjs/common';
import { TemplatesService } from './templates.service';
import { TemplatesController } from './templates.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Template } from './entities/template.entity';
import { TemplatesResolver } from './templates.resolver';
import { Paragraph } from './entities/paragraph.entity';

@Module({
  controllers: [TemplatesController],
  imports: [MikroOrmModule.forFeature({ entities: [Template, Paragraph] })],
  providers: [TemplatesService, TemplatesResolver],
})
export class TemplatesModule {}
