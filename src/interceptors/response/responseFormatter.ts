import axios from 'axios'
import {
  IPutioAPIClientError,
  IPutioAPIClientErrorData,
  PutioAPIClientResponseInterceptorFactory,
} from '../../client/types'
import { CORRELATION_ID_HEADER_NAME } from '../../constants'
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
      correlation_id: error.config.headers?.[CORRELATION_ID_HEADER_NAME],
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
