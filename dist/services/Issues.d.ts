import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, IssueId } from '../../types/types';
declare class Issues extends BaseService {
    addSpentTime(projectId: ProjectId, issueId: IssueId, duration: string, options?: Sudo): Promise<object>;
    addTimeEstimate(projectId: ProjectId, issueId: IssueId, duration: string, options?: Sudo): Promise<object>;
    all({ projectId, ...options }: {
        projectId: ProjectId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, issueId: IssueId, options?: BaseRequestOptions): Promise<object>;
    link(projectId: ProjectId, issueIId: IssueId, targetProjectId: ProjectId, targetIssueId: IssueId, options?: BaseRequestOptions): Promise<object>;
    participants(projectId: ProjectId, issueId: IssueId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(projectId: ProjectId, issueId: IssueId, options?: Sudo): Promise<object>;
    resetSpentTime(projectId: ProjectId, issueId: IssueId, options?: BaseRequestOptions): Promise<object>;
    resetTimeEstimate(projectId: ProjectId, issueId: IssueId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, issueId: IssueId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    subscribe(projectId: ProjectId, issueId: IssueId, options?: Sudo): Promise<object>;
    timeStats(projectId: ProjectId, issueId: IssueId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    unsubscribe(projectId: ProjectId, issueId: IssueId, options?: Sudo): Promise<object>;
}
export default Issues;