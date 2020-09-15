import { IPutioAPIClientError, IPutioAPIClientErrorData } from '../types'

export const identity = <T>(arg: T) => arg

export const isPutioAPIErrorResponse = (
  input: any,
): input is IPutioAPIClientErrorData =>
  Object.keys(input).includes('error_type')

export const isPutioAPIError = (
  input: unknown,
): input is IPutioAPIClientError =>
  typeof input === 'object' &&
  !!(input as Record<string, unknown>).data &&
  isPutioAPIErrorResponse((input as Record<string, unknown>).data)
