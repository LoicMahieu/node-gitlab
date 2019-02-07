import { BaseService } from '../infrastructure';
import { Sudo, KeyId } from '../../types/types';
declare class Keys extends BaseService {
    show(keyId: KeyId, options?: Sudo): Promise<import("../../types/types").GetResponse>;
}
export default Keys;
