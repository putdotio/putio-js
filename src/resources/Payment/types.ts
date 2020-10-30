type PlanCode = string
type PlanGroupCode = string
type PlanName = string
type PlanDiskSize = number
type PlanExpirationDate = string

export type PlanType = 'onetime' | 'subscription'

export type UserSubscriptionStatus =
  | 'CANCELED'
  | 'PAST_DUE'
  | 'ACTIVE'
  | 'TRIALING'

export interface IUserSubscription {
  id: number
  status: UserSubscriptionStatus
  next_billing_date?: string
  next_retry_date?: string
  update_url?: string
}

export interface IUserPlan {
  type: PlanType
  code: PlanCode
  group_code: PlanGroupCode
  storage_space: number
  period_days?: number
  subscription?: IUserSubscription
}

export interface IUserPayment {
  method: string
  provider: string
}

export interface IUserPaymentInfoResponse {
  expiration_date: string
  extend_30: string
  extend_365: string
  has_pending_payment: boolean
  last_payment?: IUserPayment
  plan?: IUserPlan
  pending_bitpay: string | null
}

export interface IVoucherInfoResponse {
  current_plan: {
    type: PlanType | null
    expiration_date: PlanExpirationDate
  }
  target_plan: {
    type: PlanType
    name: PlanName
    code: PlanCode
    group_code: PlanGroupCode
    hd_avail: PlanDiskSize
    simulated_expiration: PlanExpirationDate
  }
  new_remaining_days: number
}

export interface INanoPaymentRequestResponse {
  nano: {
    token: string
  }
}
