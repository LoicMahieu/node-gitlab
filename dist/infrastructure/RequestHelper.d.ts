import { PaginatedRequestOptions, BaseRequestOptions, GetResponse, PostResponse, PutResponse, DelResponse } from '../../types/types';
import { BaseService } from './BaseService';
export declare function get(service: BaseService, endpoint: string, options?: PaginatedRequestOptions): Promise<GetResponse>;
export declare function stream(service: BaseService, endpoint: string, options?: BaseRequestOptions): any;
export declare function post(service: BaseService, endpoint: string, options?: BaseRequestOptions): Promise<PostResponse>;
export declare function put(service: BaseService, endpoint: string, options?: BaseRequestOptions): Promise<PutResponse>;
export declare function del(service: BaseService, endpoint: string, options?: BaseRequestOptions): Promise<DelResponse>;
