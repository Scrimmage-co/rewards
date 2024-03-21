import { inject, injectable } from 'inversify';
import axios, { AxiosInstance } from 'axios';
import { CONFIG_INJECT_KEY } from '../config';
import { InitOptions } from '../types/InitOptions';
import axiosRetry from 'axios-retry';

@injectable()
export class HttpService {
  private axiosInstance: AxiosInstance;
  private isTokenRefreshing: boolean = false;
  private userToken: string;

  constructor(
    @inject(CONFIG_INJECT_KEY)
    private options: InitOptions,
  ) {
    this.axiosInstance = axios.create({
      timeout: 10000,
    });

    axiosRetry(this.axiosInstance, { retryDelay: axiosRetry.exponentialDelay });

    this.axiosInstance.interceptors.response.use(
      response => response,
      async error => {
        if (error.response.status === 403) {
          await this.refreshToken();
        }
        return Promise.reject(error);
      },
    );
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

  get(url: string) {
    return this.axiosInstance.get(url);
  }
}
