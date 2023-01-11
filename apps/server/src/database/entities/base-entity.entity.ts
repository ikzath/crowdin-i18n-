import {
  Entity,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from '@mikro-orm/core';
import { ObjectId } from '@mikro-orm/mongodb';
import { User } from 'src/users/entities/user.entity';

@Entity({ abstract: true })
export abstract class BaseEntity {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id: string;

  @Property()
  createdAt: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt: Date = new Date();
}

@Entity({ abstract: true })
export abstract class ExtendedBaseEntity extends BaseEntity {
  @ManyToOne()
  createdBy: User;

  @ManyToOne()
  updatedBy: User;
}
