import { Record } from "./record";

export class ScheduleRule extends Record<ScheduleRule> {
  id: number;
  day: number;
  leadHours: number;
  minStartMin: number;
  maxEndMin: number;
}
