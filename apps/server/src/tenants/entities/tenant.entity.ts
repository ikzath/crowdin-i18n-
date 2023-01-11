/**
 * MikroORM entity for template
 */
import { Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { ExtendedBaseEntity } from 'src/database/entities/base-entity.entity';
import { Workspace } from 'src/workspaces/dto/workspace.object';

@Entity({ collection: 'tenants' })
export class Tenant extends ExtendedBaseEntity {
  @Property()
  @Unique()
  name!: string;

  @Property()
  @Unique()
  domain!: string;

  @Property()
  @Unique()
  database!: string;

  @OneToMany('Workspace', 'tenant')
  workspaces: Workspace[];
}
