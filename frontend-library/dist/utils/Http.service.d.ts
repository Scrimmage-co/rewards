import { InitOptions } from '../types/InitOptions';
export declare class HttpService {
    private options;
    private axiosInstance;
    private isTokenRefreshing;
    private userToken;
    constructor(options: InitOptions);
    private refreshToken;
}
