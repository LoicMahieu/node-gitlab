import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, Sudo, ProjectId, TodoId, MergeRequestId } from '../../types/types';
declare class Todos extends BaseService {
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, mergerequestId: MergeRequestId, options?: Sudo): Promise<object>;
    done({ todoId, ...options }: {
        todoId?: TodoId;
    } & Sudo): Promise<object>;
}
export default Todos;
