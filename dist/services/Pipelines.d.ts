import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, PipelineId, JobScope } from '../../types/types';
declare class Pipelines extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, ref: string, options?: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, pipelineId: PipelineId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    retry(projectId: ProjectId, pipelineId: PipelineId, options?: Sudo): Promise<object>;
    cancel(projectId: ProjectId, pipelineId: PipelineId, options?: Sudo): Promise<object>;
    showJobs(projectId: ProjectId, pipelineId: PipelineId, options: {
        scope: JobScope;
    } & Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Pipelines;
