import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, Sudo, UserId, ImpersonationTokenId, ImpersonationTokenScope } from '../../types/types';
declare class UserImpersonationTokens extends BaseService {
    all(userId: UserId, options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    add(userId: UserId, name: string, scopes: ImpersonationTokenScope, expiresAt: string, options?: Sudo): Promise<object>;
    show(userId: UserId, tokenId: ImpersonationTokenId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    revoke(userId: UserId, tokenId: ImpersonationTokenId, options?: Sudo): Promise<object>;
}
export default UserImpersonationTokens;
