import { Module } from '@nestjs/common';
import { MembersService } from './members.service';
import { MembersResolver } from './members.resolver';
import { Member } from './entities/member.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UsersModule } from 'src/users/users.module';
import { WorkspacesModule } from 'src/workspaces/workspaces.module';
import { User } from 'src/users/entities/user.entity';
import { Workspace } from 'src/workspaces/dto/workspace.object';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Member, User, Workspace] }),
    UsersModule,
    WorkspacesModule,
  ],
  providers: [MembersResolver, MembersService],
  exports: [MembersService],
})
export class MembersModule {}
