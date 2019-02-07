import { BaseService } from '../infrastructure';
import { Sudo } from '../../types/types';
declare class Version extends BaseService {
    show(options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Version;
