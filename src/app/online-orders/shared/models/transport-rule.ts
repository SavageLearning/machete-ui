export class CostRule {
    minWorker: number;
    maxWorker: number;
    cost: number;
    public constructor(init?: Partial<CostRule>) {
        Object.assign(this, init);
    }
}

export class TransportRule {
    id: number;
    key: string;
    transportType: TransportType;
    zoneLabel: string;
    zipcodes: number[]; // not supporting #####-#### zips yet
    costRules: CostRule[];

    public constructor(init?: Partial<TransportRule>) {
        Object.assign(this, init);
    }
}

export enum TransportType {
    transport_van,
    transport_bus,
    transport_pickup
}

