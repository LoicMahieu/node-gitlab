import { BaseService } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class RepositoryFiles extends BaseService {
    create(projectId: ProjectId, filePath: string, branch: string, content: string, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, filePath: string, branch: string, content: string, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, filePath: string, branch: string, options?: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, filePath: string, ref: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    showRaw(projectId: ProjectId, filePath: string, ref: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default RepositoryFiles;
