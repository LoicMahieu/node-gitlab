import { BaseService } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class PushRule extends BaseService {
    create(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, { upsert, ...options }: {
        upsert: boolean;
    } & BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default PushRule;
