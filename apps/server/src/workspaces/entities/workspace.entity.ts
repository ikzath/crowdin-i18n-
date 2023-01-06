/**
 * MikroORM entity for template
 */
import { Entity, Enum, ManyToOne, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/database/entities/base-entity.entity';
import { Member } from 'src/members/entities/member.entity';
import { Tenant } from 'src/tenants/entities/tenant.entity';

@Entity({ collection: 'workspaces' })
export class Workspace extends BaseEntity {
  @Property()
  name: string;

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
  PUBLIC = 'public',
  PRIVATE = 'private',
}
