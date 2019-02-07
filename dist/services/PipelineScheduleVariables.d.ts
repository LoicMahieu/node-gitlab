import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, PipelineScheduleId, ProjectId, KeyId } from '../../types/types';
declare class PipelineScheduleVariables extends BaseService {
    all(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, keyId: KeyId, options?: BaseRequestOptions): Promise<object>;
    show(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, keyId: KeyId, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    remove(projectId: ProjectId, pipelineScheduleId: PipelineScheduleId, keyId: KeyId, options?: BaseRequestOptions): Promise<object>;
}
export default PipelineScheduleVariables;
