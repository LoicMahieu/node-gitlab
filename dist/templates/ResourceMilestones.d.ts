import { BaseService } from '../infrastructure';
import { BaseServiceOptions, PaginatedRequestOptions, BaseRequestOptions, Sudo, ResourceId, ResourceType, MilestoneId } from '../../types/types';
declare class ResourceMilestones extends BaseService {
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    all(resourceId: ResourceId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(resourceId: ResourceId, title: string, options?: BaseRequestOptions): Promise<object>;
    edit(resourceId: ResourceId, milestoneId: MilestoneId, options?: BaseRequestOptions): Promise<object>;
    issues(resourceId: ResourceId, milestoneId: MilestoneId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    mergeRequests(resourceId: ResourceId, milestoneId: MilestoneId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    show(resourceId: ResourceId, milestoneId: MilestoneId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ResourceMilestones;
