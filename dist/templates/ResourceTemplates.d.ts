import { BaseService } from '../infrastructure';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo, ResourceId, ResourceType } from '../../types/types';
declare class ResourceTemplates extends BaseService {
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    show(resourceId: ResourceId, options?: Sudo): Promise<object>;
}
export default ResourceTemplates;
