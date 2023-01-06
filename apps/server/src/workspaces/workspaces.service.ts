import { ValidationError } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
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

  async create(createWorkspaceInput: CreateWorkspaceInput) {
    const tenant = await this.tenantService.findOne(
      createWorkspaceInput.tenantId,
    );
    const workspace = this.workspaceRepository.create({
      ...createWorkspaceInput,
      tenant,
    });
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

  findAll() {
    return this.workspaceRepository.findAll();
  }

  findOne(id: string) {
    return this.workspaceRepository.findOne(id);
  }

  update(id: string, updateWorkspaceInput: UpdateWorkspaceInput) {
    const workspace = this.workspaceRepository.findOne(id);

    // todo: update workspace

    return this.workspaceRepository.persistAndFlush(workspace);
  }

  remove(id: string) {
    // todo: last workspace cannot be deleted
    const workspace = this.workspaceRepository.findOne(id);
    return this.workspaceRepository.removeAndFlush(workspace);
  }
}
