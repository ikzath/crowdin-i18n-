import { EntityRepository } from '@mikro-orm/mongodb';
import { Template } from './entities/template.entity';

export class TemplateRepository extends EntityRepository<Template> {}
