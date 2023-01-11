import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/database/entities/base-entity.entity';

@Entity({ collection: 'integrations' })
export class Integrations extends BaseEntity {
  @Property()
  name: string;
}
