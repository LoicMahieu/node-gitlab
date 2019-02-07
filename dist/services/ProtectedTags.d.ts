import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class ProtectedTags extends BaseService {
    all(projectId: ProjectId, options: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    protect(projectId: ProjectId, tagName: string, options: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, tagName: string, options: Sudo): Promise<import("../../types/types").GetResponse>;
    unprotect(projectId: ProjectId, tagName: string, options: Sudo): Promise<object>;
}
export default ProtectedTags;
