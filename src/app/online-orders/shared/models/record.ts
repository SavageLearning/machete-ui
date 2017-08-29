export class Record<T> {
  id: number;
  public constructor(init?: Partial<T>) {
    Object.assign(this, init);
  }
}