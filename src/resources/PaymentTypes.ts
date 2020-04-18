type PlanType = string
type PlanCode = string
type PlanGroupCode = string
type PlanName = string
type PlanDiskSize = number
type PlanExpirationDate = string

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
