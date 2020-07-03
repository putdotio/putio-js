import {
  MockPutioAPIClient,
  mockPutioAPIClientError,
  mockPutioAPIClientResponse,
} from '../test-utils/mocks'
import {
  IPutioAPIClientError,
  IPutioAPIClientMiddleware,
  PutioAPIClientEventTypes,
} from '../types'
import create from './clientIPChangeEmitter'

describe('middlewares/errorEmitter', () => {
  const API = new MockPutioAPIClient()
  let clientIPChangeEmitter: IPutioAPIClientMiddleware

  beforeEach(() => {
    jest.resetAllMocks()
    clientIPChangeEmitter = create(API)
  })

  it('does not call client.emit method if the IP does not change', () => {
    clientIPChangeEmitter.onFulfilled(mockPutioAPIClientResponse)
    clientIPChangeEmitter.onFulfilled(mockPutioAPIClientResponse)
    expect(API.emit).not.toHaveBeenCalled()
  })

  it('does not call client.emit method if the IP changes from initial state', () => {
    clientIPChangeEmitter.onFulfilled(mockPutioAPIClientResponse)
    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': 1 },
    })
    expect(API.emit).not.toHaveBeenCalled()
  })

  it('calls client.emit method if the IP changes once', () => {
    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '198.168.0.1' },
    })

    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '198.168.0.2' },
    })

    expect(API.emit).toBeCalledWith(
      PutioAPIClientEventTypes.CLIENT_IP_CHANGED,
      { IP: '198.168.0.1', newIP: '198.168.0.2' },
    )
  })

  it('calls client.emit method if the IP changes multiple times', () => {
    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '198.168.0.1' },
    })

    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '198.168.0.2' },
    })

    expect(API.emit).toBeCalledWith(
      PutioAPIClientEventTypes.CLIENT_IP_CHANGED,
      { IP: '198.168.0.1', newIP: '198.168.0.2' },
    )

    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '198.168.0.1' },
    })

    expect(API.emit).toBeCalledWith(
      PutioAPIClientEventTypes.CLIENT_IP_CHANGED,
      { IP: '198.168.0.2', newIP: '198.168.0.1' },
    )

    expect(API.emit).toBeCalledTimes(2)
  })

  it('calls client.emit method once if the IP changes to a falsy value', () => {
    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '198.168.0.1' },
    })

    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '198.168.0.2' },
    })

    expect(API.emit).toBeCalledWith(
      PutioAPIClientEventTypes.CLIENT_IP_CHANGED,
      { IP: '198.168.0.1', newIP: '198.168.0.2' },
    )

    clientIPChangeEmitter.onFulfilled(mockPutioAPIClientResponse)

    expect(API.emit).toBeCalledTimes(1)
  })

  it('handles failed requests and updates the IP', () => {
    const error: IPutioAPIClientError = {
      ...mockPutioAPIClientError,
      response: {
        config: {},
        data: {
          error_type: 'API_ERROR',
          error_message: 'Putio API Error',
          status_code: 400,
        },
        headers: { 'putio-client-ip': '0.0.0.0' },
        status: 400,
        statusText: 'Error!',
      },
    }

    clientIPChangeEmitter.onRejected(error).catch(e => expect(e).toEqual(error))

    clientIPChangeEmitter.onFulfilled({
      ...mockPutioAPIClientResponse,
      headers: { 'putio-client-ip': '1.1.1.1' },
    })

    expect(API.emit).toBeCalledWith(
      PutioAPIClientEventTypes.CLIENT_IP_CHANGED,
      { IP: '0.0.0.0', newIP: '1.1.1.1' },
    )
  })
})
