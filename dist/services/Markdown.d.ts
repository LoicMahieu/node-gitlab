import { BaseService } from '../infrastructure';
import { Sudo, ProjectId } from '../../types/types';
declare class Markdown extends BaseService {
    render(text: string, options: {
        gfm?: string;
        project?: ProjectId;
    } & Sudo): Promise<object>;
}
export default Markdown;
