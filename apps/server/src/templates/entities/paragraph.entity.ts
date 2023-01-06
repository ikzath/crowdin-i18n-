import { Entity, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/database/entities/base-entity.entity';

// @Embeddable()
// export class ReferToObjects {
//   @Property()
//   question: string;
//   @Property({ nullable: true })
//   field?: string;
// }

// @Embeddable()
// export class RunOptionsDelimiters {
//   @Property({ nullable: true })
//   first?: string;

//   @Property({ nullable: true })
//   default?: string;

//   @Property({ nullable: true })
//   last?: string;
// }

// @Embeddable()
// export class RunOptions {
//   @Property({ nullable: true })
//   sort?: string;

//   @Property({ nullable: true })
//   delimiters?: RunOptionsDelimiters;

//   @Property({ nullable: true })
//   function?: string;
// }

// @Embeddable()
// export class Run {
//   @Property()
//   type: string;

//   @Property({ nullable: true })
//   content?: string;

//   @Property({ nullable: true })
//   url?: string;

//   @Property({ nullable: true })
//   rules?: string[];

//   @Property({ nullable: true })
//   marks?: string[];

//   @Property({ nullable: true })
//   //   potentially type problematic
//   //   either array of strings or array of objects, not string
//   referTo?: ReferToObjects[] | string | string[];

//   @Property({ nullable: true })
//   options?: RunOptions;
// }

@Entity({ collection: 'paragraphs' })
export class Paragraph extends BaseEntity {
  @Property()
  //   later ctreate many to one relationship
  templateId: string;

  @Property()
  type: string;

  @Property({ nullable: true })
  runs?: object[];

  @Property({ nullable: true })
  order?: number;

  @Property({ nullable: true })
  rules?: string[];

  @Property({ nullable: true })
  indentation?: number;

  @Property({ nullable: true })
  alignment?: string;

  @Property({ nullable: true })
  options?: object;

  @Property({ nullable: true })
  style?: string;

  @Property({ nullable: true })
  function?: string;
}
