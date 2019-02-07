import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class PagesDomains extends BaseService {
    all({ projectId, ...options }?: {
        projectId?: ProjectId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, domain: string, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, domain: string, options?: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, domain: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(projectId: ProjectId, domain: string, options?: Sudo): Promise<object>;
}
export default PagesDomains;
