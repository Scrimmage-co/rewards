export class InvalidRewarderKeyException extends Error {
  constructor() {
    super(
      `Invalid rewarder key. Please check your rewarder key and try again.`,
    );
  }
}
