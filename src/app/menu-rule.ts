/* eslint-disable @typescript-eslint/naming-convention */
export class MenuRule {
  id: number;
  label: string;
  icon: string;
  routerLink?: string[];
  url?: string[];
  authorizedRoles?: string[];
  items?: MenuRule[];
  visible: boolean;

  public constructor(init?: Partial<MenuRule>) {
    Object.assign(this, init);
  }
}

export enum LRole {
  HIRER = "Hirer",
  ADMIN = "Administrator",
  CHECKIN = "Check-in",
  MANAGER = "Manager",
  PHONEDESK = "PhoneDesk",
  TEACHER = "Teacher",
  USER = "User",
}
