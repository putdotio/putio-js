import { PutioAPIClientMiddlewareFactory } from '../client/types'
import { identity } from '../utils'
import { eventEmitter, EVENTS } from '../eventEmitter'

export const createErrorEmitterMiddleware: PutioAPIClientMiddlewareFactory = () => ({
  onFulfilled: identity,

  onRejected: error => {
    eventEmitter.emit(EVENTS.ERROR, error)
    return Promise.reject(error)
  },
})
