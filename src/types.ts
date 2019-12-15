import { AxiosError, AxiosResponse } from "axios";
import PutioAPIClient from ".";

export interface IPutioAPIClientOptions {
  clientID?: number;
  baseURL?: string;
}

export interface IPutioAPIClientResponse extends AxiosResponse {
  body?: any; // Remove when it's irrelevant.
}

interface IPutioAPIClientErrorData {
  error_id?: string;
  error_uri?: string;
  error_type: string;
  error_message: string;
  status_code: number;
}
export interface IPutioAPIClientError extends AxiosError {
  data?: IPutioAPIClientErrorData;
}

export interface IPutioAPIClientMiddleware {
  onFulfilled: (response: IPutioAPIClientResponse) => IPutioAPIClientResponse;
  onRejected: (error: IPutioAPIClientError) => Promise<IPutioAPIClientError>;
}

export type IPutioAPIClientMiddlewareFactory = (
  client: PutioAPIClient
) => IPutioAPIClientMiddleware;

export enum PutioAPIClientEventTypes {
  ERROR = "ERROR",
  CLIENT_IP_CHANGED = "CLIENT_IP_CHANGED"
}
