export class Record<T> {
  ID: number;
  public constructor(init?: Partial<T>) {
    Object.assign(this, init);
  }
}
