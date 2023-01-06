import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { User } from '../entities/user.entity';

@Exclude()
export class UserDto {
  constructor(
    partial: Pick<
      User,
      'id' | 'firstName' | 'lastName' | 'email' | 'createdAt'
    >,
  ) {
    Object.assign(this, partial);
  }

  @Expose()
  @ApiProperty()
  readonly id: string;

  @Expose()
  @ApiProperty()
  readonly firstName: string;

  @Expose()
  @ApiProperty()
  readonly lastName: string;

  @Expose()
  @ApiProperty()
  readonly email: string;

  @Expose()
  @ApiProperty()
  createdAt: Date;

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
