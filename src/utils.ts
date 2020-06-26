import { IPutioAPIClientErrorData } from './types'

export const identity = <T>(arg: T) => arg

export const isPutioAPIError = (
  input: unknown,
): input is IPutioAPIClientErrorData =>
  typeof input === 'object' && Object.keys(input).includes('error_type')
