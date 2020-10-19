import { PutioAPIClient } from '../client'
import {
  IPutioAPIClientMiddlewareFactory,
  PutioAPIClientEventTypes,
} from '../types'
import { identity } from '../utils'

const createErrorEmitterMiddleware: IPutioAPIClientMiddlewareFactory = (
  client: PutioAPIClient,
) => ({
  onFulfilled: identity,

  onRejected: error => {
    client.emit(PutioAPIClientEventTypes.ERROR, error)
    return Promise.reject(error)
  },
})

export default createErrorEmitterMiddleware
