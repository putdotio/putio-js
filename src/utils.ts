import { IPutioAPIClientErrorData } from './types'

export const identity = (arg: any) => arg

export const isPutioAPIError = (
  input: unknown,
): input is IPutioAPIClientErrorData =>
  typeof input === 'object' && Object.keys(input).includes('error_type')
