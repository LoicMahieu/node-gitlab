import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, UserId } from '../../types/types';
declare class UserGPGKeys extends BaseService {
    all({ userId, ...options }?: {
        userId?: UserId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    add(title: any, key: any, { userId, ...options }?: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<object>;
    show(keyId: any, { userId, ...options }?: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    remove(keyId: any, { userId, ...options }?: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<object>;
}
export default UserGPGKeys;
