import { inject, injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { CONFIG_INJECT_KEY } from '../config';
import { InitOptions } from '../types/InitOptions';
import axiosRetry from 'axios-retry';

@injectable()
export class HttpService {
  private readonly axiosInstance: AxiosInstance;
  private isTokenRefreshing: boolean = false;
  private userToken: string;

  constructor(
    @inject(CONFIG_INJECT_KEY)
    private options: InitOptions,
  ) {
    this.axiosInstance = axios.create({
      timeout: 10000,
    });

    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        if (
          error?.response?.status === 403 ||
          error?.response?.status === 400
        ) {
          await this.refreshToken();
        }
        return Promise.reject(error);
      },
    );

    axiosRetry(this.axiosInstance, {
      retryDelay: axiosRetry.exponentialDelay,
      retries: 3,
      retryCondition: () => true,
    });

    this.refreshToken();

    this.axiosInstance.interceptors.request.use(config => {
      config.headers['authorization'] = `Bearer ${this.userToken}`;
      config.headers['accept'] = 'application/json';
      return config;
    });
  }

  private async refreshToken() {
    if (!this.isTokenRefreshing) {
      this.isTokenRefreshing = true;
      try {
        this.userToken = await this.options.refreshToken();
      } catch (err) {
        console.error('Error refreshing token', err);
      } finally {
        this.isTokenRefreshing = false;
      }
    }
  }

  async get(url: string) {
    return await this.axiosInstance.get(`
      ${this.options.apiServerEndpoint}/${url}`);
  }
}