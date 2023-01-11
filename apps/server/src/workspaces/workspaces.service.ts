import { ValidationError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { Tenant } from 'src/tenants/entities/tenant.entity';
import { TenantsService } from 'src/tenants/tenants.service';
import { CreateWorkspaceInput } from './dto/create-workspace.input';
import { UpdateWorkspaceInput } from './dto/update-workspace.input';
import { Workspace } from './entities/workspace.entity';
import { WorkspaceRepository } from './workspace.repository';

@Injectable()
export class WorkspacesService {
  constructor(
    @InjectRepository(Workspace)
    private readonly workspaceRepository: WorkspaceRepository,
    private readonly tenantService: TenantsService,
  ) {}
  private readonly logger = new Logger('WorkspacesService');

  async create(createWorkspaceInput: CreateWorkspaceInput, user) {
    const tenant = await this.tenantService.findOne(
      createWorkspaceInput.tenantId,
    );
    const workspace = this.workspaceRepository.create({
      ...createWorkspaceInput,
      tenant,
    });
    workspace.createdBy = user;
    workspace.updatedBy = user;
    await this.workspaceRepository.persistAndFlush(workspace);
    return workspace;
  }

  async createInital(tenant: Tenant) {
    const workspaceData = { name: 'Team', tenant: tenant };
    const workspace = this.workspaceRepository.create(workspaceData);
    this.workspaceRepository.persist(workspace);
    try {
      await this.workspaceRepository.flush();
    } catch (error) {
      throw new ValidationError(error);
    }
    return workspace;
  }

  async findAll() {
    const workspaces = await this.workspaceRepository.findAll();
    if (!workspaces) {
      throw new Error('No such workspace collection  found');
    }
    return workspaces;
  }

  async findOne(id: string) {
    const workspace = await this.workspaceRepository.findOne(id);
    if (!workspace) {
      throw new Error('No such workspace');
    }
    return workspace;
  }

  async update(updateWorkspaceInput: UpdateWorkspaceInput): Promise<Workspace> {
    const workspace = await this.workspaceRepository.findOne(
      updateWorkspaceInput.id,
    );
    if (!workspace) {
      // console.error('Console message - No such workspace');
      throw new NotFoundException('GraphQL Error - No such workspace');
    }
    workspace.name = updateWorkspaceInput.name;
    workspace.description = updateWorkspaceInput.description;
    try {
      await this.workspaceRepository.persistAndFlush(workspace);
    } catch (error) {
      throw new NotFoundException('No such workspace', error);
    }
    return workspace;
  }

  async remove(id: string) {
    const workspace = await this.workspaceRepository.findOne(id);
    if (!workspace) {
      throw new NotFoundException('GrapphQl error - No such workspace found');
    }
    try {
      await this.workspaceRepository.removeAndFlush(workspace);
    } catch (error) {
      throw new NotFoundException('DB Error', error);
    }
    return workspace;
  }
}
