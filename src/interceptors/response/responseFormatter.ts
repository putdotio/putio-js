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
          }
        : {
            ...errorData,
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
