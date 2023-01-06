import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
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
  async create(createTenantInput: CreateTenantInput) {
    const tenantData = {
      ...createTenantInput,
      domain: createTenantInput.name.toLowerCase(),
    };
    const tenant = this.tenantRepository.create(tenantData);

    // const workspace = this.workspaceService.createInital(tenant);
    await this.tenantRepository.persistAndFlush(tenant);
    return tenant;
  }

  findAll() {
    return this.tenantRepository.findAll();
  }

  findOne(id: string) {
    return this.tenantRepository.findOne(id);
  }

  update(id: string, updateTenantInput: UpdateTenantInput) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: string) {
    return `This action removes a #${id} tenant`;
  }
}
