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

export interface IFile extends Record<string, any> {
  id: number
  parent_id: number
  name: string
  size: number
  file_type: FileType
  content_type: string
  extension: string
  crc32: string
  created_at: string
}

export interface IGetStartFromResponse {
  start_from: number
}

export interface ISearchResponse {
  files: IFile[]
  total: number
  cursor: string
}
