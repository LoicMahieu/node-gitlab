import { BaseService } from '../infrastructure';
import { BaseServiceOptions, BaseRequestOptions, PaginatedRequestOptions, ResourceId, ResourceType, KeyId } from '../../types/types';
declare class ResourceVariables extends BaseService {
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    all(resourceId: ResourceId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(resourceId: ResourceId, options?: BaseRequestOptions): Promise<object>;
    edit(resourceId: ResourceId, keyId: KeyId, options?: BaseRequestOptions): Promise<object>;
    show(resourceId: ResourceId, keyId: KeyId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    remove(resourceId: ResourceId, keyId: KeyId, options?: PaginatedRequestOptions): Promise<object>;
}
export default ResourceVariables;
