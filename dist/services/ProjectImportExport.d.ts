import { BaseService } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class ProjectImportExport extends BaseService {
    download(projectId: ProjectId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    exportStatus(projectId: ProjectId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    import(content: string, path: string, options?: BaseRequestOptions): Promise<object>;
    importStatus(projectId: ProjectId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    schedule(projectId: ProjectId, options?: BaseRequestOptions): Promise<object>;
}
export default ProjectImportExport;
