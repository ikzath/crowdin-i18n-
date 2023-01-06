import { EntityRepository } from '@mikro-orm/mongodb';
import { Paragraph } from './entities/paragraph.entity';

export class ParagraphRepository extends EntityRepository<Paragraph> {}
