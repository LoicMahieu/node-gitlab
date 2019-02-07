import { BaseService } from '../infrastructure';
import { PaginatedRequestOptions, BaseRequestOptions, Sudo, SnippetId, SnippetVisibility } from '../../types/types';
declare class Snippets extends BaseService {
    all({ public: p, ...options }: {
        public: boolean;
    } & PaginatedRequestOptions): Promise<import("../../types/types").GetResponse>;
    content(snippetId: SnippetId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    create(title: string, fileName: string, content: string, visibility: SnippetVisibility, options?: BaseRequestOptions): Promise<object>;
    edit(snippetId: SnippetId, options?: BaseRequestOptions): Promise<object>;
    remove(snippetId: SnippetId, options?: Sudo): Promise<object>;
    show(snippetId: SnippetId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
    userAgentDetails(snippetId: SnippetId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Snippets;
