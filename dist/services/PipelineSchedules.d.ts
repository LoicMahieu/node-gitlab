import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, ProjectId, PipelineScheduleId } from '../../types/types';
declare class PipelineSchedules extends BaseService {
    all(projectId: ProjectId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(projectId: ProjectId, description: string, ref: string, cron: string, options?: BaseRequestOptions): Promise<object>;
    edit(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: BaseRequestOptions): Promise<object>;
    remove(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: Sudo): Promise<object>;
    show(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    takeOwnership(projectId: ProjectId, scheduleId: PipelineScheduleId, options?: Sudo): Promise<object>;
}
export default PipelineSchedules;
