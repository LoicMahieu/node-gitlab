import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, Sudo, ProjectId, KeyId } from '../../types/types';
declare class DeployKeys extends BaseService {
    add(projectId: ProjectId, options?: Sudo): Promise<object>;
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    show(projectId: ProjectId, keyId: KeyId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    enable(projectId: ProjectId, keyId: KeyId, options?: Sudo): Promise<object>;
}
export default DeployKeys;
