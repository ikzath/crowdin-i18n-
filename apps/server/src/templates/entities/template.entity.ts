/**
 * MikroORM entity for template
 */
import { Embeddable, Embedded, Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/database/entities/base-entity.entity';

@Embeddable()
export class TemplateOptions {
  @Property()
  multiLingual: boolean;
  @Property()
  languages: Array<string>;
}
@Entity({ collection: 'templates' })
export class Template extends BaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  tags?: string[];

  @Property({ nullable: true })
  archived?: boolean;

  @Property({ nullable: true })
  data?: object;

  @Embedded({ object: true, nullable: true })
  options?: TemplateOptions;
}
