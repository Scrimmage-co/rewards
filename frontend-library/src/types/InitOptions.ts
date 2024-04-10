export interface InitOptions {
  apiServerEndpoint: string;
  refreshToken: () => Promise<string>;
  onReady?: () => void;
}
