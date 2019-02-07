import { BaseService } from '../infrastructure';
import { BaseServiceOptions, Sudo, ResourceType, ResourceId, UserId, AccessLevel } from '../../types/types';
declare class ResourceAccessRequests extends BaseService {
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    all(resourceId: ResourceId): Promise<import("../../types/types").GetResponse>;
    request(resourceId: ResourceId): Promise<object>;
    approve(resourceId: ResourceId, userId: UserId, { accessLevel }: {
        accessLevel: AccessLevel;
    } & Sudo): Promise<object>;
    deny(resourceId: ResourceId, userId: UserId): Promise<object>;
}
export default ResourceAccessRequests;
