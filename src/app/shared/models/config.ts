export class Config {
    id: number;
    key: string;
    value: string;
    description: string;
    category: string;
    publicConfig: boolean;
}

export enum CCategory {
    DAILYLIST = 'DailyList',
    EMAIL = 'Emails',
    GENERAL = 'General',
    ONLINEORDERS = 'OnlineOrders',
    PAYPAL = 'PayPal'
}
