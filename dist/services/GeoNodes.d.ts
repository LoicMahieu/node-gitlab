import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, GeonodeId } from '../../types/types';
declare class GeoNodes extends BaseService {
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(geonodeId: GeonodeId, options?: BaseRequestOptions): Promise<object>;
    edit(geonodeId: GeonodeId, options?: BaseRequestOptions): Promise<object>;
    failures(options?: BaseRequestOptions): Promise<object>;
    repair(geonodeId: GeonodeId, options?: Sudo): Promise<object>;
    show(geonodeId: GeonodeId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    status(geonodeId: GeonodeId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    statuses(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
}
export default GeoNodes;
