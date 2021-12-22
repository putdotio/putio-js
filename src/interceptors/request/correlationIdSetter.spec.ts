import { v4 } from 'uuid'
import { createCorrelationIdSetter } from './correlationIdSetter'
import { CORRELATION_ID_HEADER_NAME, NIL_CORRELATION_ID } from '../../constants'

jest.mock('uuid', () => ({ v4: jest.fn() }))

describe('interceptors/request/correlationIdSetter', () => {
  const correlationIdSetter = createCorrelationIdSetter()

  beforeEach(jest.restoreAllMocks)

  it('sets a unique correlation id when uuid/v4 works properly in the environment', () => {
    const mockUUID = 'fcdfa284-6ce1-47b4-b2d4-1d5186fc6f14'
    ;(v4 as jest.Mock).mockImplementationOnce(() => mockUUID)

    expect(
      correlationIdSetter({ headers: {} }).headers[CORRELATION_ID_HEADER_NAME],
    ).toBe(mockUUID)
  })

  it('uses nil correlation id when uuid/v4 fails to work properly in the environment', () => {
    ;(v4 as jest.Mock).mockImplementationOnce(() => {
      throw new Error('uuid failed to work in the environment')
    })

    expect(
      correlationIdSetter({ headers: {} }).headers[CORRELATION_ID_HEADER_NAME],
    ).toBe(NIL_CORRELATION_ID)
  })
})
