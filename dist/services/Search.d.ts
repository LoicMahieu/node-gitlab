import { BaseService } from '../infrastructure';
import { BaseRequestOptions, ProjectId, GroupId } from '../../types/types';
declare class Search extends BaseService {
    all(scope: string, search: string, { projectId, groupId, ...options }: {
        projectId?: ProjectId;
        groupId?: GroupId;
    } & BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
}
export default Search;
