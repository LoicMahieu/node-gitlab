import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, Sudo, ProjectId, DeploymentId } from '../../types/types';
declare class Deployments extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    show(projectId: ProjectId, deploymentId: DeploymentId, options?: Sudo): Promise<object>;
}
export default Deployments;
