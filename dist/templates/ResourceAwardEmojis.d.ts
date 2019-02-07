import { BaseService } from '../infrastructure';
import { BaseServiceOptions, PaginatedRequestOptions, Sudo, ProjectId, ResourceId, ResourceType, NoteId, AwardId } from '../../types/types';
declare class ResourceAwardsEmojis extends BaseService {
    protected resourceType: string;
    constructor(resourceType: ResourceType, options: BaseServiceOptions);
    all(projectId: ProjectId, resourceId: ResourceId, noteId: NoteId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    award(projectId: ProjectId, resourceId: ResourceId, name: string, noteId: NoteId, options?: Sudo): Promise<object>;
    remove(projectId: ProjectId, resourceId: ResourceId, awardId: AwardId, noteId: NoteId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, resourceId: ResourceId, awardId: AwardId, noteId: NoteId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ResourceAwardsEmojis;
