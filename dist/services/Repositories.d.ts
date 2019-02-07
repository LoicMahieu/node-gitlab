import { BaseService } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId } from '../../types/types';
declare class Repositories extends BaseService {
    compare(projectId: ProjectId, from: string, to: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    contributors(projectId: ProjectId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    showArchive(projectId: ProjectId, options?: {
        sha: string;
    } & Sudo): Promise<import("../../types/types").GetResponse>;
    showBlob(projectId: ProjectId, sha: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    showBlobRaw(projectId: ProjectId, sha: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    tree(projectId: ProjectId, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
}
export default Repositories;
