import { Entity, OneToMany, Property } from '@mikro-orm/core';
import { BaseEntity } from 'src/database/entities/base-entity.entity';
import { Member } from 'src/members/entities/member.entity';

@Entity({ collection: 'users' })
export class User extends BaseEntity {
  @Property()
  email: string;

  @Property()
  password: string;

  @Property({ nullable: true })
  firstName?: string;

  @Property({ nullable: true })
  lastName?: string;

  @OneToMany(() => Member, (member) => member.user)
  memberships?: Member[];

  @Property({ persist: false })
  get fullName(): string {
    // TODO check for existence
    return `${this.firstName} ${this.lastName}`;
  }
}
