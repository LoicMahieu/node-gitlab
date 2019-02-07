import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, SnippetId, SnippetVisibility } from '../../types/types';
declare class ProjectSnippets extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    content(projectId: ProjectId, snippetId: SnippetId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, title: string, fileName: string, code: string, visibility: SnippetVisibility, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, snippetId: SnippetId, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, snippetId: SnippetId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, snippetId: SnippetId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    userAgentDetails(projectId: ProjectId, snippetId: SnippetId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default ProjectSnippets;
