export class Column {
  constructor(
    field: string,
    header: string,
    dateFormat: string,
    index?: number
  ) {
    this.field = field;
    this.header = header;
    this.dateFormat = dateFormat;
    this.index = index ? index : 0;
  }
  field: string;
  header: string;
  dateFormat: string;
  index: number;
}
