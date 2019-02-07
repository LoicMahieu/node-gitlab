import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, UserId } from '../../types/types';
declare class UserKeys extends BaseService {
    all({ userId, ...options }?: {
        userId?: UserId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    create(title: any, key: any, { userId, ...options }?: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<object>;
    show(keyId: any, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    remove(keyId: any, { userId, ...options }?: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<object>;
}
export default UserKeys;
