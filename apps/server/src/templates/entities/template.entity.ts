/**
 * MikroORM entity for template
 */
import {
  Embeddable,
  Embedded,
  Entity,
  ManyToOne,
  Property,
} from '@mikro-orm/core';
import { ExtendedBaseEntity } from 'src/database/entities/base-entity.entity';
import { User } from 'src/users/entities/user.entity';

@Embeddable()
export class TemplateOptions {
  @Property()
  multiLingual: boolean;
  @Property()
  languages: Array<string>;
}
@Entity({ collection: 'templates' })
export class Template extends ExtendedBaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  tags?: string[];

  @Property({ nullable: true })
  archived?: boolean;

  @Property()
  archivedAt: Date;

  // @ManyToOne()
  // archivedBy: User;

  @Property({ nullable: true })
  data?: object;

  @Embedded({ object: true, nullable: true })
  options?: TemplateOptions;
}
