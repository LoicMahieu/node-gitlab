import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, MergeRequestId, GroupId, UserId } from '../../types/types';
declare class MergeRequests extends BaseService {
    accept(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: BaseRequestOptions): Promise<object>;
    addSpentTime(projectId: ProjectId, mergerequestIId: MergeRequestId, duration: string, options?: Sudo): Promise<object>;
    addTimeEstimate(projectId: ProjectId, mergerequestIId: MergeRequestId, duration: string, options?: Sudo): Promise<object>;
    all({ projectId, groupId, ...options }: {
        projectId?: ProjectId;
        groupId: GroupId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    approve(projectId: ProjectId, mergerequestIId: MergeRequestId, options: {
        sha: string;
    } & BaseRequestOptions): Promise<object>;
    approvals(projectId: ProjectId, { mergerequestIId, ...options }: {
        mergerequestIId: MergeRequestId;
    } & BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    approvers(projectId: ProjectId, approverIds: UserId[], approverGroupIds: GroupId[], { mergerequestIId, ...options }: {
        mergerequestIId: MergeRequestId;
    } & BaseRequestOptions): Promise<object>;
    cancelOnPipelineSucess(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<object>;
    changes(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    closesIssues(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    commits(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, sourceBranch: string, targetBranch: string, title: string, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: BaseRequestOptions): Promise<object>;
    editApprovals(projectId: ProjectId, { mergerequestIId, ...options }: {
        mergerequestIId: MergeRequestId;
    } & BaseRequestOptions): Promise<object>;
    pipelines(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    remove(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<object>;
    resetSpentTime(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<object>;
    resetTimeEstimate(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    timeStats(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    version(projectId: ProjectId, mergerequestIId: MergeRequestId, versionId: number, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    versions(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    unapprove(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<object>;
    unsubscribe(projectId: ProjectId, mergerequestIId: MergeRequestId, options?: Sudo): Promise<object>;
}
export default MergeRequests;
