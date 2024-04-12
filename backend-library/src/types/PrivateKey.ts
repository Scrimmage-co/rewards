export interface PrivateKey {
  /**
   * Alias for the private key. Used to identify the private key when
   * sending rewards.
   */
  alias: string;
  /**
   * Private key used to send rewards.
   */
  value: string;
}
