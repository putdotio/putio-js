import { IPutioAPIClientMiddlewareFactory } from '../types'

const isPutioAPIError = (data: any) => data.error_type && data.error_message

const createResponseFormatterMiddleware: IPutioAPIClientMiddlewareFactory = () => ({
  onFulfilled: response => ({
    ...response,
    body: response.data,
  }),

  onRejected: error => {
    if (error.response && error.response.data) {
      const { status, data = {} } = error.response

      error.data = isPutioAPIError(data)
        ? { ...data, status_code: status }
        : {
            error_message: error.message,
            error_type: 'ERROR',
            status_code: status,
          }
    } else {
      error.data = {
        error_message: error.message,
        error_type: 'ERROR',
        status_code: 0,
      }
    }

    return Promise.reject(error)
  },
})

export default createResponseFormatterMiddleware
