/**
 * MikroORM entity for template
 */
import { Entity, OneToMany, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from 'src/database/entities/base-entity.entity';
import { Workspace } from 'src/workspaces/dto/workspace.object';

@Entity({ collection: 'tenants' })
export class Tenant extends BaseEntity {
  @Property()
  @Unique()
  name!: string;

  @Property()
  @Unique()
  domain!: string;

  @OneToMany('Workspace', 'tenant')
  workspaces: Workspace[];
}
