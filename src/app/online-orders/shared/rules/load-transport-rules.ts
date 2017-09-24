import { TransportRule, TransportType, CostRule } from '../models/transport-rule';

export function loadTransportRules(): Array<TransportRule> {
    return [
        new TransportRule({
            id: 1,
            key: 'bus_inside_zone',
            lookupKey: 'transport_bus',
            transportType: TransportType.transport_bus,
            zoneLabel: 'inside',
            zipcodes: ["98101", "98102", "98103", "98104", "98105", "98106",
                "98107", "98109", "98112", "98115", "98116", "98117", "98118",
                "98119", "98121", "98122", "98125", "98126", "98133", "98134",
                "98136", "98144", "98154", "98164", "98174", "98177", "98195",
                "98199"],
            costRules: [
                new CostRule({id: 1, minWorker: 0, maxWorker: 10000, cost: 5 })
            ]
        }),
        new TransportRule({
            id: 2,
            key: 'bus_outside_zone',
            lookupKey: 'transport_bus',
            transportType: TransportType.transport_bus,
            zoneLabel: 'outside',
            zipcodes: ["98005", "98006", "98007", "98008", "98033", "98039",
                "98052", "98040", "98004", "98074", "98075", "98029", "98027",
                "98028", "98155", "98166", "98146", "98168", "98057", "98056",
                "98059", "98037", "98020", "98026", "98043", "98021", "98011"],
            costRules: [
                new CostRule({id: 2, minWorker: 0, maxWorker: 10000, cost: 10 })
            ]
        }),
        new TransportRule({
            id: 3,
            key: 'van_inside_zone',
            lookupKey: 'transport_van',
            transportType: TransportType.transport_van,
            zoneLabel: 'inside',
            zipcodes: ["98101", "98102", "98103", "98104", "98105", "98106",
                "98107", "98109", "98112", "98115", "98116", "98117", "98118",
                "98119", "98121", "98122", "98125", "98126", "98133", "98134",
                "98136", "98144", "98154", "98164", "98174", "98177", "98195",
                "98199"],
            costRules: [
                new CostRule({id: 3, minWorker: 0, maxWorker: 1, cost: 15 }),
                new CostRule({id: 4, minWorker: 1, maxWorker: 2, cost: 5 }),
                new CostRule({id: 5, minWorker: 2, maxWorker: 10, cost: 0 }),
            ]
        }),
        new TransportRule({
            id: 4,
            key: 'van_outside_zone',
            lookupKey: 'transport_van',
            transportType: TransportType.transport_van,
            zoneLabel: 'outside',
            zipcodes: ["98005", "98006", "98007", "98008", "98033", "98039",
                "98052", "98040", "98004", "98074", "98075", "98029", "98027",
                "98028", "98155", "98166", "98146", "98168", "98057", "98056",
                "98059", "98037", "98020", "98026", "98043", "98021", "98011"],
            costRules: [
                new CostRule({id: 6, minWorker: 0, maxWorker: 1, cost: 25 }),
                new CostRule({id: 7, minWorker: 1, maxWorker: 10, cost: 0 }),
            ]                
        }),
    ];
}