import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, TriggerId } from '../../types/types';
declare class Triggers extends BaseService {
    add(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    edit(projectId: ProjectId, triggerId: TriggerId, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, triggerId: TriggerId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, triggerId: TriggerId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Triggers;
