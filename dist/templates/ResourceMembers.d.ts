import { BaseService } from '../infrastructure';
import { BaseServiceOptions, PaginatedRequestOptions, BaseRequestOptions, AccessLevel, Sudo, ResourceId, ResourceType, UserId } from '../../types/types';
declare class ResourceMembers extends BaseService {
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    all(resourceId: ResourceId, includeInherited?: boolean, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    add(resourceId: ResourceId, userId: UserId, accessLevel: AccessLevel, options?: BaseRequestOptions): Promise<object>;
    edit(resourceId: ResourceId, userId: UserId, accessLevel: AccessLevel, options?: BaseRequestOptions): Promise<object>;
    show(resourceId: ResourceId, userId: UserId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(resourceId: ResourceId, userId: UserId, options?: Sudo): Promise<object>;
}
export default ResourceMembers;
