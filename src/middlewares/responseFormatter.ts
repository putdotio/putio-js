import {
  IPutioAPIClientError,
  PutioAPIClientMiddlewareFactory,
} from '../client/types'
import { isPutioAPIErrorResponse } from '../utils'

export const createResponseFormatterMiddleware: PutioAPIClientMiddlewareFactory = () => ({
  onFulfilled: response => ({
    ...response,
    body: response.data,
  }),

  onRejected: error => {
    let errorData: any = {}

    if (error.response && error.response.data) {
      const { status, data } = error.response

      errorData = isPutioAPIErrorResponse(data)
        ? { ...data, status_code: status }
        : {
            error_message: error.message,
            error_type: 'ERROR',
            status_code: status,
          }
    } else {
      errorData = {
        error_message: error.message,
        error_type: 'ERROR',
        status_code: 0,
      }
    }

    const formattedError: IPutioAPIClientError = {
      ...error,
      data: errorData,
      toJSON: () => errorData,
    }

    return Promise.reject(formattedError)
  },
})
