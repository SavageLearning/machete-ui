import { Record } from './record';

export class Confirm extends Record<Confirm> {
  name: string;
  description: string;
  confirmed: boolean;
}
