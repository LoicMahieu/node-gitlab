import { BaseService } from '../infrastructure';
import { BaseRequestOptions, PaginatedRequestOptions, BroadcastMessageId } from '../../types/types';
declare class BroadcastMessages extends BaseService {
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(options?: BaseRequestOptions): Promise<object>;
    edit(broadcastMessageId: BroadcastMessageId, options?: BaseRequestOptions): Promise<object>;
    remove(broadcastMessageId: BroadcastMessageId): Promise<object>;
    show(broadcastMessageId: BroadcastMessageId, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
}
export default BroadcastMessages;
