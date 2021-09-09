export default class ErrorModel {
  constructor(error: string[], label: string) {
    this.error = error;
    this.label = label;
  }
  error: string[];
  label: string;
}
