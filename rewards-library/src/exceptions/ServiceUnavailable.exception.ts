export class ServiceUnavailableException extends Error {
  constructor(baseUrl: string) {
    super(
      `Service is unavailable at ${baseUrl}. Please check your connection and try again.`,
    );
  }
}
