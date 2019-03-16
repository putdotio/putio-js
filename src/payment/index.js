export default class Payment {
  constructor(client) {
    this.client = client
  }

  Info() {
    return this.client.get('/payment/info')
  }

  Plans() {
    return this.client.get('/payment/plans')
  }

  History({ unReportedOnly = false } = {}) {
    return this.client.get('/payment/history', {
      query: {
        unreported_only: unReportedOnly,
      },
    })
  }

  Invites() {
    return this.client.get('/payment/invites')
  }

  GetPlanChangeInfo({ planPath, paymentType, couponCode }) {
    return this.client.get(`/payment/change_plan/${planPath}`, {
      query: {
        coupon_code: couponCode,
        payment_type: paymentType,
      },
    })
  }

  GetPlanChangeUrls({ planPath, paymentType, couponCode }) {
    return this.client.post(`/payment/change_plan/${planPath}`, {
      query: {
        coupon_code: couponCode,
      },
      body: {
        payment_type: paymentType,
      },
    })
  }

  ChangePlan(args) {
    return this.GetPlanChangeUrls(args)
  }

  CreateCoinbaseCharge(path) {
    return this.client.post('/payment/methods/coinbase/charge', {
      body: {
        plan_fs_path: path,
      },
    })
  }

  CreateCoinbaseCheckout(path) {
    return this.client.post('/payment/methods/coinbase/checkout', {
      body: {
        plan_fs_path: path,
      },
    })
  }

  CancelSubscription() {
    return this.client.post('/payment/stop_subscription')
  }

  RedeemVoucher(code) {
    return this.client.post(`/payment/redeem_voucher/${code}`)
  }

  VerifyFastspringPayment(reference) {
    return this.client.get(`/payment/fs-confirm/${reference}`)
  }

  Report(paymentIds = []) {
    return this.client.post('/payment/report', {
      body: {
        payment_ids: paymentIds.join(','),
      },
    })
  }

  AddWaitingPayment(data) {
    return this.client.post('/payment/paddle_waiting_payment', {
      body: data,
    })
  }
}
