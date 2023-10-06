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
    interface ReservationListReq extends Services.Common.Pagination {
      /**
       * 订单id
       */
      orderId?: string
      /**
       * 服务结束日期
       */
      serviceEndDate?: string
      /**
       * 服务结束时间
       */
      serviceEndTime?: string
      /**
       * 服务开始日期
       */
      serviceStartDate?: string
      /**
       * 服务开始时间
       */
      serviceStartTime?: string
      /**
       * 服务状态, NOT_IN_EFFECT：未生效；TO_BE_SERVED：待服务；IN_SERVICE：服务中；FINISH：已完成；CLOSED：已关闭；
       */
      state?:
        | 'NOT_IN_EFFECT'
        | 'TO_BE_SERVED'
        | 'IN_SERVICE'
        | 'FINISH'
        | 'CLOSED'
    }
    interface ReservationListRes {
      offset: number
      total: number
      item: any[]
    }
    interface ReservationUpdateStateReq {
      id: number
      state: 'IN_SERVICE' | 'FINISH'
    }
    type ReservationUpdateStateRes = boolean
    interface ReservationDetailReq {
      id: number
    }
    type ReservationDetailRes = any
  }
}
