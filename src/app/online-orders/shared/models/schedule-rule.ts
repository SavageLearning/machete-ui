import { Record } from './record';

export class ScheduleRule extends Record<ScheduleRule> {
    id: number;
    leadHours: number;
    minStartMin: number;
    maxEndMin: number;

}
