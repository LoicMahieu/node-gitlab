import { BaseServiceOptions, Requester } from '../../types/types';
export declare class BaseService {
    readonly url: string;
    readonly requester: Requester;
    readonly headers: {
        [header: string]: string;
    };
    readonly rejectUnauthorized: boolean;
    constructor({ token, oauthToken, sudo, host, url, version, rejectUnauthorized, requester, }: BaseServiceOptions);
}
