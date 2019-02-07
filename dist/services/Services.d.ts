import { BaseService } from '../infrastructure';
import { BaseRequestOptions, Sudo, ProjectId, SupportedService } from '../../types/types';
declare class Services extends BaseService {
    edit(projectId: ProjectId, serviceName: SupportedService, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, serviceName: SupportedService, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, serviceName: SupportedService, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Services;
