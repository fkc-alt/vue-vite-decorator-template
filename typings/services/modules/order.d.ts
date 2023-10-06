declare namespace Service {
  namespace Order {
    interface OrderListReq extends Services.Common.Pagination {
      /**
       * 内部订单号
       */
      orderId?: string
      /**
       * 商户系统订单号
       */
      outTradeNo?: string
      /**
       * 下单openid
       */
      spOpenid?: string
      /**
       * 交易状态,
       * NO_TPAY：未支付；PAY_SUCCESS：支付成功；PARTIAL_REFUND：部分退款；FULL_REFUND：全部退款；TO_BE_RECEIVED：待收货；CLOSED：已关闭；
       */
      tradeState?:
        | 'PAY_SUCCESS'
        | 'PARTIAL_REFUND'
        | 'FULL_REFUND'
        | 'TO_BE_RECEIVED'
        | 'CLOSED'
      userId?: string
    }
    interface OrderListRes extends Services.Common.Pagination {
      offset: number
      total: number
      item: any[]
    }
    interface OrderItem {
      name: string
      stock: number
      orderId: string
      price: number
    }
  }
}
