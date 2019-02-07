import { BaseService } from '../infrastructure';
import { BaseRequestOptions, Sudo } from '../../types/types';
declare class ApplicationSettings extends BaseService {
    all(options?: Sudo): Promise<import("../../types/types").GetResponse>;
    edit(options?: BaseRequestOptions): Promise<object>;
}
export default ApplicationSettings;
