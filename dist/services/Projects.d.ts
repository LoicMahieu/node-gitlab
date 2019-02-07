import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, EventOptions, Sudo, ProjectId, UserId, GroupId, NamespaceId } from '../../types/types';
declare class Projects extends BaseService {
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    archive(projectId: ProjectId, options?: Sudo): Promise<object>;
    create({ userId, ...options }: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    events(projectId: ProjectId, options?: BaseRequestOptions & EventOptions): Promise<import("../../types/types").GetResponse>;
    fork(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    forks(projectId: ProjectId, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    languages(projectId: ProjectId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    mirrorPull(projectId: ProjectId, options?: Sudo): Promise<object>;
    remove(projectId: ProjectId, options?: Sudo): Promise<object>;
    search(projectName: string): Promise<import("../../types/types").GetResponse>;
    share(projectId: ProjectId, groupId: GroupId, groupAccess: number, options?: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    star(projectId: ProjectId, options?: Sudo): Promise<object>;
    statuses(projectId: ProjectId, sha: string, state: string, options?: BaseRequestOptions): Promise<object>;
    transfer(projectId: ProjectId, namespaceId: NamespaceId): Promise<object>;
    unarchive(projectId: ProjectId, options?: Sudo): Promise<object>;
    unshare(projectId: ProjectId, groupId: GroupId, options?: Sudo): Promise<object>;
    unstar(projectId: ProjectId, options?: Sudo): Promise<object>;
    updatePushRule(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
    upload(projectId: any, content: any, { fileName }: {
        fileName?: string;
    }): Promise<object>;
}
export default Projects;
