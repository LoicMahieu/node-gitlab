import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo, ProjectId, EnvironmentId } from '../../types/types';
declare class Environments extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, environmentId: EnvironmentId, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, environmentId: EnvironmentId, options?: Sudo): Promise<object>;
    stop(projectId: ProjectId, environmentId: EnvironmentId, options?: Sudo): Promise<object>;
}
export default Environments;
