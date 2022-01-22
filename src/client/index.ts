import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import qs from 'qs'
import { createCorrelationIdSetter } from '../interceptors/request/correlationIdSetter'
import { createClientIPChangeEmitter } from '../interceptors/response/clientIPChangeEmitter'
import { createErrorEmitter } from '../interceptors/response/errorEmitter'
import { createResponseFormatter } from '../interceptors/response/responseFormatter'
import {
  eventEmitter,
  EVENTS,
  PutioAPIClientEventTypes,
  EventListener,
} from '../eventEmitter'
import {
  PutioAPIClientResponseInterceptorFactory,
  IPutioAPIClientOptions,
  IPutioAPIClientResponse,
} from './types'
import Auth from '../resources/Auth/Auth'
import OAuth from '../resources/Auth/OAuth'
import DownloadLinks from '../resources/DownloadLinks/DownloadLinks'
import Sharing from '../resources/Sharing/Sharing'
import Config from '../resources/Config'
import Events from '../resources/Events/Events'
import Family from '../resources/Family'
import File from '../resources/Files/File'
import Files from '../resources/Files/Files'
import FriendInvites from '../resources/FriendInvites/FriendInvites'
import Friends from '../resources/Friends/Friends'
import IFTTT from '../resources/IFTTT'
import Payment from '../resources/Payment/Payment'
import RSS from '../resources/RSS'
import Transfers from '../resources/Transfers/Transfers'
import Trash from '../resources/Trash'
import Tunnel from '../resources/Tunnel'
import User from '../resources/User/User'
import Zips from '../resources/Zips'
import { PutioApiClientRequestInterceptorFactory } from '..'
import { DEFAULT_CLIENT_OPTIONS } from '../constants'

export class PutioAPIClient {
  public static EVENTS = EVENTS
  public static DEFAULT_OPTIONS = DEFAULT_CLIENT_OPTIONS

  public options: IPutioAPIClientOptions
  public token: string | undefined
  public http: AxiosInstance

  public Auth: Auth
  public DownloadLinks: DownloadLinks
  public Sharing: Sharing
  public Config: Config
  public Events: Events
  public Family: Family
  public Files: Files
  public File: File
  public Friends: Friends
  public FriendInvites: FriendInvites
  public IFTTT: IFTTT
  public OAuth: OAuth
  public Payment: Payment
  public RSS: RSS
  public Transfers: Transfers
  public Trash: Trash
  public Tunnel: Tunnel
  public User: User
  public Zips: Zips

  constructor(options: IPutioAPIClientOptions) {
    this.options = { ...PutioAPIClient.DEFAULT_OPTIONS, ...options }
    this.http = this.createHTTPClient()
    this.Auth = new Auth(this)
    this.DownloadLinks = new DownloadLinks(this)
    this.Sharing = new Sharing(this)
    this.Config = new Config(this)
    this.Events = new Events(this)
    this.Files = new Files(this)
    this.File = new File(this)
    this.Friends = new Friends(this)
    this.FriendInvites = new FriendInvites(this)
    this.Family = new Family(this)
    this.OAuth = new OAuth(this)
    this.Payment = new Payment(this)
    this.RSS = new RSS(this)
    this.Transfers = new Transfers(this)
    this.Trash = new Trash(this)
    this.Tunnel = new Tunnel(this)
    this.User = new User(this)
    this.Zips = new Zips(this)
    this.IFTTT = new IFTTT(this)
  }

  public once(event: PutioAPIClientEventTypes, listener: EventListener) {
    eventEmitter.once(event, listener)
  }

  public on(event: PutioAPIClientEventTypes, listener: EventListener) {
    eventEmitter.on(event, listener)
  }

  public off(event: PutioAPIClientEventTypes, listener: EventListener) {
    eventEmitter.off(event, listener)
  }

  public configure(options: IPutioAPIClientOptions) {
    this.options = { ...this.options, ...options }
    return this
  }

  public setToken(token: string): PutioAPIClient {
    this.token = token
    this.http.defaults.headers.common.Authorization = `token ${token}`
    return this
  }

  public clearToken(): PutioAPIClient {
    this.token = undefined
    this.http.defaults.headers.common.Authorization = ``
    return this
  }

  public get<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IPutioAPIClientResponse<T>> {
    return this.http({
      method: 'GET',
      url,
      ...config,
    })
  }

  public post<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IPutioAPIClientResponse<T>> {
    return this.http({
      method: 'POST',
      url,
      ...config,
    })
  }

  public put<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IPutioAPIClientResponse<T>> {
    return this.http({
      method: 'PUT',
      url,
      ...config,
    })
  }

  public delete<T = any>(
    url: string,
    config?: AxiosRequestConfig,
  ): Promise<IPutioAPIClientResponse<T>> {
    return this.http({
      method: 'DELETE',
      url,
      ...config,
    })
  }

  private createHTTPClient() {
    const axiosInstance = axios.create({
      baseURL: this.options.baseURL,
      withCredentials: true,
      timeout: 30000,
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: 'comma' }),
    })

    // apply request interceptors
    const requestInterceptorFactories: PutioApiClientRequestInterceptorFactory[] = [
      createCorrelationIdSetter,
    ]

    requestInterceptorFactories
      .map(createInterceptor => createInterceptor(this.options))
      .forEach(requestInterceptor => {
        axiosInstance.interceptors.request.use(
          requestInterceptor,
          null,
          // the 3rd argument is not reflected in the types, but it exists?
          // @ts-ignore
          { synchronous: true },
        )
      })

    // apply response interceptors
    const responseInterceptorFactories: PutioAPIClientResponseInterceptorFactory[] = [
      createResponseFormatter,
      createClientIPChangeEmitter,
      createErrorEmitter,
    ]

    responseInterceptorFactories
      .map(createResponseInterceptor => createResponseInterceptor(this.options))
      .forEach(({ onFulfilled, onRejected }) => {
        axiosInstance.interceptors.response.use(onFulfilled, onRejected)
      })

    return axiosInstance
  }
}
