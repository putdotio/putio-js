type PlanType = string
type PlanName = string
type PlanDiskSize = number
type PlanExpirationDate = string

export interface IVoucherInfoResponse {
  current_plan: {
    plan_type: PlanType | null
  }
  target_plan: {
    plan_type: PlanType
    period_days: number
    plan_name: PlanName
    hd_avail: PlanDiskSize
    simulated_expiration: PlanExpirationDate
  }
  new_remaining_days: number
}
