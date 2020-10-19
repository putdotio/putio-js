import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import EventEmitter, { Emitter, EventListener } from 'event-emitter'
import qs from 'qs'

import createClientIPChangeEmitterMiddleware from './middlewares/clientIPChangeEmitter'
import createErrorEmitterMiddleware from './middlewares/errorEmitter'
import createResponseFormatterMiddleware from './middlewares/responseFormatter'

import Auth from './resources/Auth'
import Config from './resources/Config'
import Events from './resources/Events/Events'
import Family from './resources/Family'
import File from './resources/Files/File'
import Files from './resources/Files/Files'
import FriendInvites from './resources/FriendInvites/FriendInvites'
import Friends from './resources/Friends/Friends'
import IFTTT from './resources/IFTTT'
import OAuth from './resources/OAuth'
import Payment from './resources/Payment/Payment'
import RSS from './resources/RSS'
import Transfers from './resources/Transfers'
import Trash from './resources/Trash'
import Tunnel from './resources/Tunnel'
import User from './resources/User/User'
import Zips from './resources/Zips'

import {
  IPutioAPIClientMiddleware,
  IPutioAPIClientMiddlewareFactory,
  IPutioAPIClientOptions,
  IPutioAPIClientResponse,
  PutioAPIClientEventTypes,
} from './types'

export class PutioAPIClient {
  public static EVENTS = PutioAPIClientEventTypes

  public static DEFAULT_OPTIONS: IPutioAPIClientOptions = {
    baseURL: 'https://api.put.io/v2',
    clientID: 1,
    webAppURL: 'https://app.put.io',
  }

  public options: IPutioAPIClientOptions
  public token: string | undefined

  public emitter: Emitter

  public http: AxiosInstance

  public Auth: Auth
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
    this.emitter = EventEmitter()
    this.options = { ...PutioAPIClient.DEFAULT_OPTIONS, ...options }
    this.http = this.createHTTPClient()
    this.Auth = new Auth(this)
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

  public emit(event: PutioAPIClientEventTypes, ...args: any[]) {
    this.emitter.emit(event, ...args)
  }

  public once(event: PutioAPIClientEventTypes, listener: EventListener) {
    this.once(event, listener)
  }

  public on(event: PutioAPIClientEventTypes, listener: EventListener) {
    this.emitter.on(event, listener)
  }

  public off(event: PutioAPIClientEventTypes, listener: EventListener) {
    this.emitter.off(event, listener)
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

    const middlewareFactories: IPutioAPIClientMiddlewareFactory[] = [
      createResponseFormatterMiddleware,
      createClientIPChangeEmitterMiddleware,
      createErrorEmitterMiddleware,
    ]

    const middlewares: IPutioAPIClientMiddleware[] = middlewareFactories.map(
      createMiddleware => createMiddleware(this),
    )

    middlewares.forEach(middleware => {
      axiosInstance.interceptors.response.use(
        middleware.onFulfilled,
        middleware.onRejected,
      )
    })

    return axiosInstance
  }
}
