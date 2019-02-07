import { BaseService } from '../infrastructure';
import { BaseServiceOptions, PaginatedRequestOptions, BaseRequestOptions, Sudo, ResourceId, ResourceType, NoteId } from '../../types/types';
declare class ResourceNotes extends BaseService {
    protected resource2Type: string;
    constructor(resourceType: ResourceType, resource2Type: ResourceType, options: BaseServiceOptions);
    all(resourceId: ResourceId, resource2Id: ResourceId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(resourceId: ResourceId, resource2Id: ResourceId, body: string, options?: BaseRequestOptions): Promise<object>;
    edit(resourceId: ResourceId, resource2Id: ResourceId, noteId: NoteId, body: string, options?: BaseRequestOptions): Promise<object>;
    remove(resourceId: ResourceId, resource2Id: ResourceId, noteId: NoteId, options?: Sudo): Promise<object>;
    show(resourceId: ResourceId, resource2Id: ResourceId, noteId: NoteId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ResourceNotes;
