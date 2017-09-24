import { SelectItem } from "primeng/primeng";

export class MySelectItem implements SelectItem {
    constructor(public label: string, public value: string) {}
  }