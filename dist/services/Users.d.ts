import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, UserId, EventOptions } from '../../types/types';
declare class Users extends BaseService {
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    activities(options?: Sudo): Promise<import("../../types/types").GetResponse>;
    projects(userId: UserId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    block(userId: UserId, options?: Sudo): Promise<object>;
    create(options?: BaseRequestOptions): Promise<object>;
    current(options?: Sudo): Promise<import("../../types/types").GetResponse>;
    edit(userId: UserId, options?: BaseRequestOptions): Promise<object>;
    events(userId: UserId, options?: BaseRequestOptions & EventOptions): Promise<import("../../types/types").GetResponse>;
    session(email: string, password: string, options?: Sudo): Promise<object>;
    search(emailOrUsername: string, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    show(userId: UserId, options?: BaseRequestOptions): Promise<import("../../types/types").GetResponse>;
    remove(userId: UserId, options?: Sudo): Promise<object>;
    unblock(userId: UserId, options?: Sudo): Promise<object>;
}
export default Users;
