import axios from 'axios'
import {
  IPutioAPIClientError,
  IPutioAPIClientErrorData,
  PutioAPIClientResponseInterceptorFactory,
} from '../../client/types'
import { isPutioAPIErrorResponse } from '../../utils'

export const createResponseFormatter: PutioAPIClientResponseInterceptorFactory = () => ({
  onFulfilled: response => ({
    ...response,
    body: response.data,
  }),

  onRejected: (error: Error) => {
    if (!axios.isAxiosError(error)) {
      return Promise.reject(error)
    }

    let errorData: IPutioAPIClientErrorData = {
      'x-trace-id': error.response?.headers['x-trace-id'],
      error_message: error.message,
      error_type: 'ERROR',
      status_code: 0,
    }

    if (error.response && error.response.data) {
      const { status, data } = error.response
      errorData = isPutioAPIErrorResponse(data)
        ? {
            ...errorData,
            ...data,
            status_code: status,
          }
        : {
            ...errorData,
            status_code: status,
          }
    } else if (
      error.request instanceof XMLHttpRequest &&
      error.request.readyState === 4
    ) {
      const { status, responseText } = error.request
      const data = JSON.parse(responseText)

      errorData = {
        ...errorData,
        ...data,
        status_code: status,
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
