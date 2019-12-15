import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import EventEmitter from "event-emitter";
import Auth from "./auth";
import Events from "./events";
import Family from "./family";
import File from "./file";
import Files from "./files";
import Friends from "./friends";
import IFTTT from "./ifttt";
import OAuth from "./oauth";
import Payment from "./payment";
import RSS from "./rss";
import Transfers from "./transfers";
import Trash from "./trash";
import Tunnel from "./tunnel";
import {
  IPutioAPIClientError,
  IPutioAPIClientOptions,
  IPutioAPIClientResponse,
  PutioAPIClientEventTypes,
} from "./types";
import User from "./user";
import Zips from "./zips";

class PutioAPIClient {
  public static DEFAULT_OPTIONS: IPutioAPIClientOptions = {
    baseURL: "https://api.put.io/v2",
    clientID: 1
  };

  public options: IPutioAPIClientOptions;
  public Auth: Auth;
  public Events: any;
  public Files: any;
  public File: any;
  public Friends: any;
  public Family: any;
  public OAuth: any;
  public Payment: any;
  public RSS: any;
  public Transfers: any;
  public Trash: any;
  public Tunnel: any;
  public User: any;
  public Zips: any;
  public IFTTT: any;

  private http: AxiosInstance;
  private emit: (event: PutioAPIClientEventTypes, data: any) => void;

  constructor(options: IPutioAPIClientOptions) {
    EventEmitter(this);
    this.options = { ...PutioAPIClient.DEFAULT_OPTIONS, ...options };
    this.http = this.createHTTPClient();
    this.Auth = new Auth(this);
    this.Events = new Events(this);
    this.Files = new Files(this);
    this.File = new File(this);
    this.Friends = new Friends(this);
    this.Family = new Family(this);
    this.OAuth = new OAuth(this);
    this.Payment = new Payment(this);
    this.RSS = new RSS(this);
    this.Transfers = new Transfers(this);
    this.Trash = new Trash(this);
    this.Tunnel = new Tunnel(this);
    this.User = new User(this);
    this.Zips = new Zips(this);
    this.IFTTT = new IFTTT(this);
  }

  public setToken(token: string) {
    this.http.defaults.headers.common.Authorization = `token ${token}`;
    return this;
  }

  public setAdminToken(token: string) {
    this.http.defaults.headers.common["Putio-Admin-Token"] = token;
    return this;
  }

  public get(url: string, config?: AxiosRequestConfig) {
    return this.http.get(url, config);
  }

  public post(url: string, config?: AxiosRequestConfig) {
    return this.http.post(url, config);
  }

  public put(url: string, config?: AxiosRequestConfig) {
    return this.http.put(url, config);
  }

  public delete(url: string, config?: AxiosRequestConfig) {
    return this.http.delete(url, config);
  }

  private onHTTPSuccess(response: AxiosResponse): IPutioAPIClientResponse {
    return { ...response, body: response.data };
  }

  private onHTTPFailure(e: any): Promise<IPutioAPIClientError> {
    let error: IPutioAPIClientError;

    if (e.response && e.response.data) {
      const { status, data = {} } = e.response;

      const isPutioAPIError = (response: any) =>
        response.error_type && response.error_message;

      error = isPutioAPIError(data)
        ? { ...data, status_code: status }
        : { ...data, error_type: "ERROR", status_code: status };
    } else {
      error = { error_type: "ERROR", error_message: e.message, status_code: 0 };
    }

    this.emit(PutioAPIClientEventTypes.ERROR, error);
    return Promise.reject(error);
  }

  private createHTTPClient() {
    const axiosInstance = axios.create({
      baseURL: this.options.baseURL,
      withCredentials: true
    });

    axiosInstance.interceptors.response.use(
      (response: AxiosResponse) => this.onHTTPSuccess(response),
      (error: any) => this.onHTTPFailure(error)
    );

    return axiosInstance;
  }
}

export default PutioAPIClient;
