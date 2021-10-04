export class HandleError {
  static error(error: any): Promise<any> {
    console.error(error);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    return Promise.reject(error.message || error);
  }
}
