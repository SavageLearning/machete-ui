import { ScheduleRule } from '../models/schedule-rule';

export function loadScheduleRules(): Array<ScheduleRule> {
    return  [
        new ScheduleRule({id: 1, day: 0, leadHours: 48, minStartMin: 420, maxEndMin: 1020}),
        new ScheduleRule({id: 2, day: 1, leadHours: 48, minStartMin: 420, maxEndMin: 1020}),
        new ScheduleRule({id: 3, day: 2, leadHours: 48, minStartMin: 420, maxEndMin: 1020}),
        new ScheduleRule({id: 4, day: 3, leadHours: 48, minStartMin: 420, maxEndMin: 1020}),
        new ScheduleRule({id: 5, day: 4, leadHours: 48, minStartMin: 420, maxEndMin: 1020}),
        new ScheduleRule({id: 6, day: 5, leadHours: 48, minStartMin: 420, maxEndMin: 1020}),
        new ScheduleRule({id: 7, day: 6, leadHours: 48, minStartMin: 420, maxEndMin: 1020})
    ];
}
