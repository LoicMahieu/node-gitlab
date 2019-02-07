import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, Sudo, NamespaceId } from '../../types/types';
declare class Namespaces extends BaseService {
    all(options?: PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    show(namespaceId: NamespaceId, options: {
        search?: string;
    } & Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Namespaces;
