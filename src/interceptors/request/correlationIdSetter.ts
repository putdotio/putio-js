import { CORRELATION_ID_HEADER_NAME, NIL_CORRELATION_ID } from '../../constants'
import { PutioApiClientRequestInterceptorFactory } from '../../client/types'

export const createCorrelationIdSetter: PutioApiClientRequestInterceptorFactory = () => config => {
  try {
    const { v4 } = require('uuid')
    config.headers[CORRELATION_ID_HEADER_NAME] = v4()
  } catch {
    config.headers[CORRELATION_ID_HEADER_NAME] = NIL_CORRELATION_ID
  }

  return config
}
