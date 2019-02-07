import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, GroupProjectId, ProjectId } from '../../types/types';
declare class GroupProjects extends BaseService {
    all(groupId: GroupProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    add(groupId: GroupProjectId, projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
}
export default GroupProjects;
