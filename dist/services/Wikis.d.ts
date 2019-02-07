import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class Wikis extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, slug: string, options?: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, slug: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(projectId: ProjectId, slug: string, options?: Sudo): Promise<object>;
}
export default Wikis;
