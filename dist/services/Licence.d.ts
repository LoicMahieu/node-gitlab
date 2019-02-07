import { BaseService } from '../infrastructure';
import { Sudo } from '../../types/types';
declare class Licence extends BaseService {
    all(options?: Sudo): Promise<import("../../types/types").GetResponse>;
    create(options?: Sudo): Promise<object>;
}
export default Licence;
