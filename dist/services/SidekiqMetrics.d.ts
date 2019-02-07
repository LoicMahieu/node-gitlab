import { BaseService } from '../infrastructure';
declare class SidekiqMetrics extends BaseService {
    queueMetrics(): Promise<import("../../types/types").GetResponse>;
    processMetrics(): Promise<import("../../types/types").GetResponse>;
    jobStats(): Promise<import("../../types/types").GetResponse>;
    compoundMetrics(): Promise<import("../../types/types").GetResponse>;
}
export default SidekiqMetrics;
