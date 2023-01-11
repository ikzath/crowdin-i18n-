import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/database/entities/base-entity.entity';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/entities/workspace.entity';

@Entity({ collection: 'members' })
export class Member extends BaseEntity {
  @Property({ nullable: true })
  role?: string;

  @Property({ nullable: true })
  owner?: boolean;

  @Property({ nullable: true })
  archived?: boolean;

  @ManyToOne()
  workspace: Workspace;

  @ManyToOne()
  user: User;
}
