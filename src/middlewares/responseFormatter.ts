import { AxiosError } from 'axios'
import PutioAPIClient from '..'
import { mockPutioAPIClientError } from '../test-utils/mocks'
import {
  IPutioAPIClientError,
  IPutioAPIClientMiddlewareFactory,
} from '../types'

const isPutioAPIError = (data: any) => data.error_type && data.error_message

const createResponseFormatterMiddleware: IPutioAPIClientMiddlewareFactory = () => ({
  onFulfilled: response => ({
    ...response,
    body: response.data,
  }),

  onRejected: error => {
    let errorData: any = {}

    if (error.response && error.response.data) {
      const { status, data = {} } = error.response

      errorData = isPutioAPIError(data)
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

export default createResponseFormatterMiddleware
