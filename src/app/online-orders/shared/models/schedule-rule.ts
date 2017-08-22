
export class ScheduleRule {
    id: number;
    leadHours: number;
    minStartMin: number;
    maxEndMin: number;

    public constructor(init?: Partial<ScheduleRule>) {
        Object.assign(this, init);
    }
}
