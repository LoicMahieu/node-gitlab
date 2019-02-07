import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, LabelId } from '../../types/types';
declare class Labels extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, labelName: string, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, labelName: string, options?: Sudo): Promise<object>;
    subscribe(projectId: ProjectId, labelId: LabelId, options?: Sudo): Promise<object>;
    unsubscribe(projectId: ProjectId, labelId: LabelId, options?: Sudo): Promise<object>;
}
export default Labels;
