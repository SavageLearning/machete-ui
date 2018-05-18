import { Record } from './record';

export class CostRule extends Record<CostRule> {
    minWorker: number;
    maxWorker: number;
    cost: number;
}

export class TransportRule extends Record<TransportRule> {
    key: string;
    lookupKey: string;
    transportType: TransportType;
    zoneLabel: string;
    zipcodes: string[];
    costRules: CostRule[];
}

export enum TransportType {
    transport_van,
    transport_bus,
    transport_pickup
}

export class TransportProvider extends Record<TransportProvider> {
    key: string;
    text: string;
    defaultAttribute: boolean;
    sortorder?: number;
    active: boolean;
}

export class TransportProviderAvailability extends Record<TransportProviderAvailability> {
    day: number;
    available: boolean;
}

