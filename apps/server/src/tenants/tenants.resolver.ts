import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TenantsService } from './tenants.service';
import { Tenant } from './dto/tenant.object';
import { CreateTenantInput } from './dto/create-tenant.input';
import { UpdateTenantInput } from './dto/update-tenant.input';

@Resolver(() => Tenant)
export class TenantsResolver {
  constructor(private readonly tenantsService: TenantsService) {}

  @Mutation(() => Tenant, { name: 'tenantCreate' })
  createTenant(
    @Args('createTenantInput') createTenantInput: CreateTenantInput,
  ) {
    return this.tenantsService.create(createTenantInput);
  }

  @Query(() => [Tenant], { name: 'tenants' })
  findAll() {
    return this.tenantsService.findAll();
  }

  @Query(() => Tenant, { name: 'tenant' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tenantsService.findOne(id);
  }

  @Mutation(() => Tenant, { name: 'tenantUpdate' })
  updateTenant(
    @Args('updateTenantInput') updateTenantInput: UpdateTenantInput,
  ) {
    return this.tenantsService.update(updateTenantInput.id, updateTenantInput);
  }

  @Mutation(() => Tenant, { name: 'tenantDelete' })
  removeTenant(@Args('id', { type: () => String }) id: string) {
    return this.tenantsService.remove(id);
  }
}
