export class ApiArray<T> extends Array<T> {
  public totalRecords: number;
  
  constructor(items?: Array<T>) {
    super(...items);
    Object.setPrototypeOf(this, Object.create(ApiArray.prototype));
  }
}