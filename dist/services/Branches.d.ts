import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class Branches extends BaseService {
    all(projectId: ProjectId, options: {
        search: string;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, branchName: string, ref: string, options?: Sudo): Promise<object>;
    protect(projectId: ProjectId, branchName: string, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, branchName: string, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, branchName: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    unprotect(projectId: ProjectId, branchName: string, options?: Sudo): Promise<object>;
}
export default Branches;
