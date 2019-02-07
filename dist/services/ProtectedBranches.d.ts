import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class ProtectedBranches extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    protect(projectId: ProjectId, branchName: string, options?: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, branchName: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    unprotect(projectId: ProjectId, branchName: string, options?: Sudo): Promise<object>;
}
export default ProtectedBranches;
