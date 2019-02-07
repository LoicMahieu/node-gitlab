import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, JobId, PipelineId, JobScope } from '../../types/types';
declare class Jobs extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    cancel(projectId: ProjectId, jobId: JobId, options?: Sudo): Promise<object>;
    downloadSingleArtifactFile(projectId: ProjectId, jobId: JobId, artifactPath: string, { stream, ...options }: {
        stream?: boolean;
    } & BaseRequestOptions): any;
    downloadLatestArtifactFile(projectId: ProjectId, ref: string, name: string, { stream, ...options }: {
        stream?: boolean;
    } & BaseRequestOptions): any;
    downloadTraceFile(projectId: ProjectId, jobId: JobId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    erase(projectId: ProjectId, jobId: JobId, options?: Sudo): Promise<object>;
    keepArtifacts(projectId: ProjectId, jobId: JobId, options?: Sudo): Promise<object>;
    play(projectId: ProjectId, jobId: JobId, options?: Sudo): Promise<object>;
    retry(projectId: ProjectId, jobId: JobId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, jobId: JobId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    showPipelineJobs(projectId: ProjectId, pipelineId: PipelineId, options: {
        scope: JobScope;
    } & Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Jobs;
