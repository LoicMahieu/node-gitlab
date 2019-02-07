import { BaseService } from '../infrastructure';
import { Sudo } from '../../types/types';
declare class Lint extends BaseService {
    lint(content: string, options?: Sudo): Promise<object>;
}
export default Lint;
