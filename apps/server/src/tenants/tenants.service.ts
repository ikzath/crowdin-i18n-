import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkspacesService } from 'src/workspaces/workspaces.service';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';
import { Tenant } from './entities/tenant.entity';
import { TenantRepository } from './tenant.repository';

@Injectable()
export class TenantsService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: TenantRepository,
  ) {}
  async create(createTenantInput: CreateTenantInput, user) {
    const domain = createTenantInput.name.replace(' ', '_').toLowerCase();
    const tenantData = {
      ...createTenantInput,
      domain,
    };
    const tenant = this.tenantRepository.create(tenantData);
    tenant.createdBy = user;
    tenant.updatedBy = user;
    tenant.database = domain;
    // const workspace = this.workspaceService.createInital(tenant);
    await this.tenantRepository.persistAndFlush(tenant);
    return tenant;
  }

  async findAll() {
    const tenants = await this.tenantRepository.findAll();
    if (!tenants) {
      throw new Error('No such tenants collection found');
    }
    return tenants;
  }

  async findOne(id: string) {
    const tenant = await this.tenantRepository.findOne(id);
    if (!tenant) {
      throw new Error('No such tenant');
    }
    return tenant;
  }

  async update(updateTenantInput: UpdateTenantInput) {
    const tenant = await this.tenantRepository.findOne(updateTenantInput.id);
    if (!tenant) {
      return { message: 'No such tenant' };
    }
    tenant.name = updateTenantInput.name;
    try {
      if (tenant) {
        await this.tenantRepository.persistAndFlush(tenant);
      }
    } catch (error) {
      throw new Error(error);
    }
    return tenant;
  }

  async remove(id: string) {
    const tenant = await this.tenantRepository.findOne(id);
    if (!tenant) {
      throw new NotFoundException('GrapphQl/... error - No such tenant found');
    }
    try {
      await this.tenantRepository.removeAndFlush(tenant);
    } catch (error) {
      throw new NotFoundException('DB Error', error);
    }
    return tenant;
  }
}
