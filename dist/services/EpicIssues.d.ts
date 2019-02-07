import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo, GroupId, EpicId, IssueId } from '../../types/types';
declare class EpicIssues extends BaseService {
    all(groupId: GroupId, epicId: EpicId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    assign(groupId: GroupId, epicId: EpicId, issueId: IssueId, options?: Sudo): Promise<object>;
    edit(groupId: GroupId, epicId: EpicId, issueId: IssueId, options?: BaseRequestOptions): Promise<object>;
    remove(groupId: GroupId, epicId: EpicId, issueId: IssueId, options?: Sudo): Promise<object>;
}
export default EpicIssues;
