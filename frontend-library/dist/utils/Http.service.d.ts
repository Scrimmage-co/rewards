import { InitOptions } from '../types/InitOptions';
export declare class HttpService {
    private options;
    private readonly axiosInstance;
    private isTokenRefreshing;
    private userToken;
    constructor(options: InitOptions);
    private refreshToken;
    get(url: string): Promise<import("axios").AxiosResponse<any, any>>;
}
