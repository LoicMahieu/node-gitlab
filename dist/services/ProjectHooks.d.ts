import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, HookId } from '../../types/types';
declare class ProjectHooks extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    show(projectId: ProjectId, hookId: HookId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    add(projectId: ProjectId, url: string, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, hookId: HookId, url: string, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, hookId: HookId, options?: Sudo): Promise<object>;
}
export default ProjectHooks;
