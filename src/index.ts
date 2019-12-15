import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import EventEmitter from "event-emitter";

import createClientIPChangeEmitterMiddleware from "./middlewares/clientIPChangeEmitter";
import createErrorEmitterMiddleware from "./middlewares/errorEmitter";
import createResponseFormatterMiddleware from "./middlewares/responseFormatter";

import Auth from "./resources/Auth";
import Events from "./resources/Events";
import Family from "./resources/Family";
import File from "./resources/File";
import Files from "./resources/Files";
import Friends from "./resources/Friends";
import IFTTT from "./resources/IFTTT";
import OAuth from "./resources/OAuth";
import Payment from "./resources/Payment";
import RSS from "./resources/RSS";
import Transfers from "./resources/Transfers";
import Trash from "./resources/Trash";
import Tunnel from "./resources/Tunnel";
import User from "./resources/User";
import Zips from "./resources/Zips";

import {
  IPutioAPIClientMiddleware,
  IPutioAPIClientMiddlewareFactory,
  IPutioAPIClientOptions,
  PutioAPIClientEventTypes
} from "./types";

class PutioAPIClient {
  public static DEFAULT_OPTIONS: IPutioAPIClientOptions = {
    baseURL: "https://api.put.io/v2",
    clientID: 1
  };

  public options: IPutioAPIClientOptions;
  public token: string;
  public emit: (event: PutioAPIClientEventTypes, data: any) => void;

  public Auth: Auth;
  public Events: Events;
  public Family: Family;
  public Files: Files;
  public File: File;
  public Friends: Friends;
  public IFTTT: IFTTT;
  public OAuth: OAuth;
  public Payment: Payment;
  public RSS: RSS;
  public Transfers: Transfers;
  public Trash: any;
  public Tunnel: Tunnel;
  public User: User;
  public Zips: Zips;

  private http: AxiosInstance;

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

  public setToken(token: string): PutioAPIClient {
    this.token = token;
    this.http.defaults.headers.common.Authorization = `token ${token}`;
    return this;
  }

  public setAdminToken(token: string): PutioAPIClient {
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

  private createHTTPClient() {
    const axiosInstance = axios.create({
      baseURL: this.options.baseURL,
      withCredentials: true
    });

    const middlewareFactories: IPutioAPIClientMiddlewareFactory[] = [
      createClientIPChangeEmitterMiddleware,
      createResponseFormatterMiddleware,
      createErrorEmitterMiddleware
    ];

    const middlewares: IPutioAPIClientMiddleware[] = middlewareFactories.map(
      createMiddleware => createMiddleware(this)
    );

    middlewares.forEach(middleware => {
      axiosInstance.interceptors.response.use(
        middleware.onFulfilled,
        middleware.onRejected
      );
    });

    return axiosInstance;
  }
}

export default PutioAPIClient;
