import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, BaseServiceOptions, Sudo, ResourceId, ResourceType, NoteId, DiscussionId } from '../../types/types';
declare class ResourceDiscussions extends BaseService {
    protected resource2Type: ResourceType;
    constructor(resourceType: ResourceType, resource2Type: ResourceType, options: BaseServiceOptions);
    addNote(resourceId: ResourceId, resource2Id: ResourceId, discussionId: DiscussionId, noteId: NoteId, content: string, options?: BaseRequestOptions): Promise<object>;
    all(resourceId: ResourceId, resource2Id: ResourceId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(resourceId: ResourceId, resource2Id: ResourceId, content: string, options?: BaseRequestOptions): Promise<object>;
    editNote(resourceId: ResourceId, resource2Id: ResourceId, discussionId: DiscussionId, noteId: NoteId, options?: BaseRequestOptions): Promise<object>;
    removeNote(resourceId: ResourceId, resource2Id: ResourceId, discussionId: DiscussionId, noteId: NoteId, options?: Sudo): Promise<object>;
    show(resourceId: ResourceId, resource2Id: ResourceId, discussionId: DiscussionId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ResourceDiscussions;
