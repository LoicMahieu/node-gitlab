import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ResourceId, ResourceType, LabelId } from '../../types/types';
declare class ResourceIssueBoards extends BaseService {
    constructor(resourceType: ResourceType, options: any);
    all(resourceId: ResourceId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(resourceId: ResourceId, name: string, options?: Sudo): Promise<object>;
    createList(resourceId: ResourceId, boardId: number, labelId: LabelId, options?: Sudo): Promise<object>;
    edit(resourceId: ResourceId, boardId: number, options?: BaseRequestOptions): Promise<object>;
    editList(resourceId: ResourceId, boardId: number, listId: number, position: number, options?: Sudo): Promise<object>;
    lists(resourceId: ResourceId, boardId: number, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(resourceId: ResourceId, boardId: number, options?: Sudo): Promise<object>;
    removeList(resourceId: ResourceId, boardId: number, listId: number, options?: Sudo): Promise<object>;
    show(resourceId: ResourceId, boardId: number, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    showList(resourceId: ResourceId, boardId: number, listId: number, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ResourceIssueBoards;
