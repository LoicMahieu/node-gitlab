import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, UserId } from '../../types/types';
declare class UserEmails extends BaseService {
    all({ userId, ...options }?: {
        userId?: UserId;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    add(email: any, { userId, ...options }?: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<object>;
    show(emailId: any, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    remove(emailId: any, { userId, ...options }?: {
        userId?: UserId;
    } & BaseRequestOptions): Promise<object>;
}
export default UserEmails;
