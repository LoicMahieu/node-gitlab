import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class Tags extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, tagName: string, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, tagName: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Tags;
