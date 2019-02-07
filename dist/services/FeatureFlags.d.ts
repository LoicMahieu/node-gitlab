import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions } from '../../types/types';
declare class FeatureFlags extends BaseService {
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    set(name: string, options?: BaseRequestOptions): Promise<object>;
}
export default FeatureFlags;
