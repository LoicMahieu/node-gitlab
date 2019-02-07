import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, RunnerId } from '../../types/types';
declare class Runners extends BaseService {
    all({ projectId, ...options }: {
        projectId: ProjectId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    allOwned(options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    edit(runnerId: RunnerId, options?: BaseRequestOptions): Promise<object>;
    enable(projectId: ProjectId, runnerId: RunnerId, options?: Sudo): Promise<object>;
    disable(projectId: ProjectId, runnerId: RunnerId, options?: Sudo): Promise<object>;
    jobs(runnerId: RunnerId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(runnerId: RunnerId, options?: Sudo): Promise<object>;
    show(runnerId: RunnerId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Runners;
