import { EntityRepository } from '@mikro-orm/mongodb';
import { Workspace } from './entities/workspace.entity';

export class WorkspaceRepository extends EntityRepository<Workspace> {}
