export type FileType =
  | 'FOLDER'
  | 'FILE'
  | 'AUDIO'
  | 'VIDEO'
  | 'IMAGE'
  | 'ARCHIVE'
  | 'PDF'
  | 'TEXT'
  | 'SWF'

export interface IGetStartFromResponse {
  start_from: number
}
