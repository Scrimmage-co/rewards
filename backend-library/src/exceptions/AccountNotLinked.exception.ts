export class AccountNotLinkedException extends Error {
  constructor(id: string) {
    super(`Account with [${id}] is not linked`);
  }
}
