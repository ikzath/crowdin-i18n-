import { EntityRepository } from '@mikro-orm/mongodb';
import { Tenant } from './entities/tenant.entity';

export class TenantRepository extends EntityRepository<Tenant> {}
