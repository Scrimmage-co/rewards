export class InvalidPrivateKeyException extends Error {
  constructor() {
    super('Invalid private key or unauthorized access');
  }
}
