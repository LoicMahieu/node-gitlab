import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, EventOptions } from '../../types/types';
declare class Events extends BaseService {
    all(options?: PaginatedRequestOptions & EventOptions): Promise<import("../../types/types").GetResponse>;
}
export default Events;
