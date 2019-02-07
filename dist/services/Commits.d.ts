import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, Sudo, CommitAction, ProjectId } from '../../types/types';
declare class Commits extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    cherryPick(projectId: ProjectId, sha: string, branch: string, options?: Sudo): Promise<object>;
    comments(projectId: ProjectId, sha: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, branch: string, message: string, actions?: CommitAction[], options?: BaseRequestOptions): Promise<object>;
    createComment(projectId: ProjectId, sha: string, note: string, options?: BaseRequestOptions): Promise<object>;
    diff(projectId: ProjectId, sha: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    editStatus(projectId: ProjectId, sha: string, options?: BaseRequestOptions): Promise<object>;
    references(projectId: ProjectId, sha: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    show(projectId: ProjectId, sha: string, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    status(projectId: ProjectId, sha: string, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    mergeRequests(projectId: ProjectId, sha: string): Promise<import("../../types/types").GetResponse>;
}
export default Commits;
