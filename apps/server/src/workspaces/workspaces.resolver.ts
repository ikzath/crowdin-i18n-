import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { WorkspacesService } from './workspaces.service';
import { Workspace, WorkspacePayload } from './dto/workspace.object';
import { CreateWorkspaceInput } from './dto/create-workspace.input';
import { UpdateWorkspaceInput } from './dto/update-workspace.input';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from 'src/auth/guards/gql-auth.guard';
import { GqlCurrentUser } from 'src/auth/decorators/gql-current-user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Workspace)
@UseGuards(GqlAuthGuard)
export class WorkspacesResolver {
  constructor(private readonly workspacesService: WorkspacesService) {}

  @Mutation(() => Workspace, { name: 'workspaceCreate' })
  createWorkspace(
    @GqlCurrentUser() user: User,
    @Args('createWorkspaceInput') createWorkspaceInput: CreateWorkspaceInput,
  ) {
    return this.workspacesService.create(createWorkspaceInput, user);
  }

  @Query(() => [Workspace], { name: 'workspaces' })
  findAll() {
    return this.workspacesService.findAll();
  }

  @Query(() => Workspace, { name: 'workspace' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.workspacesService.findOne(id);
  }

  @Mutation(() => Workspace, { name: 'workspaceUpdate' })
  updateWorkspace(
    @Args('updateWorkspaceInput') updateWorkspaceInput: UpdateWorkspaceInput,
  ) {
    return this.workspacesService.update(updateWorkspaceInput);
  }

  @Mutation(() => WorkspacePayload, { name: 'workspaceDelete' })
  removeWorkspace(@Args('id') id: string) {
    const workspace = this.workspacesService.remove(id);
    return { workspace, success: true };
  }
}
