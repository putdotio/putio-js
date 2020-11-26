import { ISODateString } from '../../utils/types'

type TransferType = 'URL' | 'TORRENT' | 'PLAYLIST' | 'LIVE_STREAM'

type TransferStatus =
  | 'WAITING'
  | 'IN_QUEUE'
  | 'DOWNLOADING'
  | 'COMPLETING'
  | 'STOPPING'
  | 'SEEDING'
  | 'COMPLETED'
  | 'ERROR'
  | 'PREPARING_SEED'

type BaseTransfer = {
  availability: null | number
  created_at: ISODateString
  current_ratio: null | number
  down_speed: number
  downloaded: number
  error_message: null | string
  estimated_time: null | number
  file_id: null | number
  finished_at: null | ISODateString
  id: number
  is_private: boolean
  name: string
  save_parent_id: number
  seconds_seeding: null | number
  size: number
  source: string
  started_at: null | ISODateString
  status: TransferStatus
  type: TransferType
  subscription_id: null | number
  uploaded: number
  up_speed: number

  // not documented in swagger
  callback_url: null | string
  client_ip: null | string
  completion_percent: number // used?
  created_torrent: boolean // used?
  download_id: number
  hash: null | string // used?
  links: string[] // used?
  peers_connected: number
  peers_getting_from_us: number
  peers_sending_to_us: number
  percent_done: number
  simulated: boolean
  status_message: string
  torrent_link: null | string
  tracker: null | string
  tracker_message: null | string

  // documented in swagger but doesn't come in response, delete from api docs?
  peers: number
}

type FinishedTransfer = BaseTransfer & {
  finished_at: ISODateString
  file_id: number
}

/* by status */
type CompletedTransfer = FinishedTransfer & {
  status: 'COMPLETED'
}

type FailedTransfer = BaseTransfer & {
  status: 'ERROR'
  error_message: string
}

/* by status, but scoped to type */
type PreparingSeedingTorrentTransfer = FinishedTransfer & {
  type: 'TORRENT'
  status: 'PREPARING_SEED'
}

type SeedingTorrentTransfer = FinishedTransfer & {
  type: 'TORRENT'
  status: 'SEEDING'
  seconds_seeding: number
  current_ratio: number
}

type CompletedTorrentTransfer = SeedingTorrentTransfer & {
  status: 'COMPLETED'
}

/* by type */
export type TorrentTransfer = (
  | BaseTransfer
  | FailedTransfer
  | SeedingTorrentTransfer
  | PreparingSeedingTorrentTransfer
  | CompletedTorrentTransfer
) & {
  type: 'TORRENT'
  torrent_link: string
}

export type URLTransfer = (
  | BaseTransfer
  | FailedTransfer
  | CompletedTransfer
) & {
  type: 'URL'
}

export type PlaylistTransfer = (
  | BaseTransfer
  | FailedTransfer
  | CompletedTransfer
) & {
  type: 'PLAYLIST'

  // not documented in swagger. not present in transfers/list response, but comes within socket updates
  downloaded_items: number
  total_items: number

  // why present in this one?
  recorded_seconds: number
}

export type LiveStreamTransfer = (
  | BaseTransfer
  | FailedTransfer
  | CompletedTransfer
) & {
  type: 'LIVE_STREAM'

  // not documented in swagger
  recorded_seconds: number
}

export type Transfer =
  | TorrentTransfer
  | URLTransfer
  | PlaylistTransfer
  | LiveStreamTransfer

export interface ITransfersResponse {
  transfers: Transfer[]
  total: number
  cursor: string
}
