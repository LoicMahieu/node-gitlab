import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo, GroupId, EpicId } from '../../types/types';
declare class Epics extends BaseService {
    all(groupId: GroupId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(groupId: GroupId, title: string, options?: BaseRequestOptions): Promise<object>;
    edit(groupId: GroupId, epicId: EpicId, options?: BaseRequestOptions): Promise<object>;
    remove(groupId: GroupId, epicId: EpicId, options?: Sudo): Promise<object>;
    show(groupId: GroupId, epicId: EpicId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Epics;
