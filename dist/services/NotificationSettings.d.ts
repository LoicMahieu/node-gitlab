import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, NotificationSettingLevel, ProjectId, GroupId } from '../../types/types';
declare class NotificationSettings extends BaseService {
    all({ projectId, groupId, ...options }?: {
        projectId?: ProjectId;
        groupId?: GroupId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    edit({ projectId, groupId, ...options }?: {
        projectId?: ProjectId;
        groupId?: GroupId;
        level?: NotificationSettingLevel;
    } & BaseRequestOptions): Promise<object>;
}
export default NotificationSettings;
