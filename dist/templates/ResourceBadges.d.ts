import { BaseService } from '../infrastructure';
import { BaseServiceOptions, PaginatedRequestOptions, BaseRequestOptions, Sudo, ResourceId, ResourceType, BadgeId } from '../../types/types';
declare class ResourceBadges extends BaseService {
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    add(resourceId: ResourceId, options?: BaseRequestOptions): Promise<object>;
    all(resourceId: ResourceId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    edit(resourceId: ResourceId, badgeId: BadgeId, options?: BaseRequestOptions): Promise<object>;
    preview(resourceId: ResourceId, linkUrl: string, imageUrl: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(resourceId: ResourceId, badgeId: BadgeId, options?: Sudo): Promise<object>;
    show(resourceId: ResourceId, badgeId: BadgeId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ResourceBadges;
