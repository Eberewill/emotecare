import axios, { AxiosError, type AxiosInstance, type AxiosRequestConfig, type AxiosResponse } from "axios";
import { clearAuthCookies, getToken } from "./cookie";

declare module "axios" {
  interface AxiosResponse<T = any> extends Promise<T> {}
}

const ignoreAuthRoutes = ["/auth/login"];

class HTTPService {
  public instance: AxiosInstance;

  public constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3000/api', // configure the instance with our base URL
      timeout: 10 * 1000,
    });

    //register request and response interceptors.

    this._initializeRequestInterceptor();

    this._initializeResponseInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };

  private _handleRequest = async (config: AxiosRequestConfig) => {
    let token = getToken();
    if (config && config.headers) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  };

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  private _handleResponse = (data: AxiosResponse) => data.data;

  protected _handleError = (error: AxiosError) => {
    const isUnAuthenticated = error.response?.status === 401;
    const url = error.response?.config.url;
    if (isUnAuthenticated && url && !ignoreAuthRoutes.includes(url)) {
      //log user out, delete cookie.
      clearAuthCookies();
      window.location.href = "/";
      return;
    }
    return Promise.reject(error);
  };
}

export default HTTPService;
