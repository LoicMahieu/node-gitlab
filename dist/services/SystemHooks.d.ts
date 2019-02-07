import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, HookId } from '../../types/types';
declare class SystemHooks extends BaseService {
    add(url: string, options?: BaseRequestOptions): Promise<object>;
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    edit(hookId: HookId, url: string, options?: BaseRequestOptions): Promise<object>;
    remove(hookId: HookId, options?: Sudo): Promise<object>;
}
export default SystemHooks;
