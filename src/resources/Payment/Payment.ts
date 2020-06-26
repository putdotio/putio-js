import PutioAPIClient from '../../client'
import { IUserPaymentInfoResponse, IVoucherInfoResponse } from './types'

export default class Payment {
  private client: PutioAPIClient

  constructor(client: PutioAPIClient) {
    this.client = client
  }

  public Info() {
    return this.client.get<IUserPaymentInfoResponse>('/payment/info')
  }

  public Plans() {
    return this.client.get('/payment/plans')
  }

  public History({ unReportedOnly = false } = {}) {
    return this.client.get('/payment/history', {
      params: {
        unreported_only: unReportedOnly,
      },
    })
  }

  public Invites() {
    return this.client.get('/payment/invites')
  }

  public GetPlanChangeInfo({
    planPath,
    paymentType,
    couponCode,
  }: {
    planPath: string
    paymentType: string
    couponCode?: string
  }) {
    return this.client.get(`/payment/change_plan/${planPath}`, {
      params: {
        coupon_code: couponCode,
        payment_type: paymentType,
      },
    })
  }

  public GetPlanChangeUrls({
    planPath,
    paymentType,
    couponCode,
  }: {
    planPath: string
    paymentType: string
    couponCode?: string
  }) {
    return this.client.post(`/payment/change_plan/${planPath}`, {
      data: {
        payment_type: paymentType,
      },
      params: {
        coupon_code: couponCode,
      },
    })
  }

  public ChangePlan(args) {
    return this.GetPlanChangeUrls(args)
  }

  public CreateCoinbaseCharge(path: string) {
    return this.client.post('/payment/methods/coinbase/charge', {
      data: {
        plan_fs_path: path,
      },
    })
  }

  public CreateCoinbaseCheckout(path: string) {
    return this.client.post('/payment/methods/coinbase/checkout', {
      data: {
        plan_fs_path: path,
      },
    })
  }

  public CancelSubscription() {
    return this.client.post('/payment/stop_subscription')
  }

  public GetVoucherInfo(code: string) {
    return this.client.get<IVoucherInfoResponse>(
      `/payment/redeem_voucher/${code}`,
    )
  }

  public RedeemVoucher(code: string) {
    return this.client.post(`/payment/redeem_voucher/${code}`)
  }

  public VerifyFastspringPayment(reference: string) {
    return this.client.get(`/payment/fs-confirm/${reference}`)
  }

  public Report(paymentIds = []) {
    return this.client.post('/payment/report', {
      data: {
        payment_ids: paymentIds.join(','),
      },
    })
  }

  public AddWaitingPayment(data) {
    return this.client.post('/payment/paddle_waiting_payment', { data })
  }
}
