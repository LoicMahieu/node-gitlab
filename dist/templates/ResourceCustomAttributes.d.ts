import { BaseService } from '../infrastructure';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo, ResourceId, ResourceType, CustomAttributeId } from '../../types/types';
declare class ResourceCustomAttributes extends BaseService {
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    all(resourceId: ResourceId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    set(resourceId: ResourceId, customAttributeId: CustomAttributeId, value: string, options?: Sudo): Promise<object>;
    remove(resourceId: ResourceId, customAttributeId: CustomAttributeId, options?: Sudo): Promise<object>;
    show(resourceId: ResourceId, customAttributeId: CustomAttributeId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ResourceCustomAttributes;
