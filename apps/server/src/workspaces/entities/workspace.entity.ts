/**
 * MikroORM entity for template
 */
import { Entity, Enum, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { ExtendedBaseEntity } from 'src/database/entities/base-entity.entity';
import { Member } from 'src/members/entities/member.entity';
import { Tenant } from 'src/tenants/entities/tenant.entity';

@Entity({ collection: 'workspaces' })
export class Workspace extends ExtendedBaseEntity {
  @Property()
  name: string;

  @Property({ nullable: true })
  description?: string;

  @Property()
  timezone = 'Europe/Berlin';

  @Enum(() => Visibility)
  visibility = Visibility.PUBLIC;

  @OneToMany(() => Member, (member) => member.workspace)
  members?: Workspace[];

  @ManyToOne()
  tenant: Tenant;
}

export enum Visibility {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
