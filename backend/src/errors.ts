export enum AccountErrorStrings {
  NoAccount = "NoAccount",
  BadPassword = "BadPassword",
}

export class AccountError extends Error {
  constructor(public kind: AccountErrorStrings) {
    super(kind);
    this.name = "AccountError";
  }
}
