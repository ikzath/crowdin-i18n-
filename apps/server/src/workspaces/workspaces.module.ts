import { Module } from '@nestjs/common';
import { WorkspacesService } from './workspaces.service';
import { WorkspacesResolver } from './workspaces.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Workspace } from './entities/workspace.entity';
import { TenantsModule } from 'src/tenants/tenants.module';

@Module({
  imports: [
    MikroOrmModule.forFeature({ entities: [Workspace] }),
    TenantsModule,
  ],
  providers: [WorkspacesResolver, WorkspacesService],
  exports: [WorkspacesService],
})
export class WorkspacesModule {}
