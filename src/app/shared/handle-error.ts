export class HandleError {
  static error(error: any): Promise<any> {
    console.error(error);
    return Promise.reject(error.message || error);
  }
}
