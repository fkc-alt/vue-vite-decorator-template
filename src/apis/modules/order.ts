import Service from '@/utils/service'

export const GetOrderList = async <T extends Service.OrderListReq, U extends Service.OrderListRes>(data: T) => {
  return await Service.request<T, U>({ method: 'post', url: '/orderList', data })
}

export const GetOrderDetail = async <T extends Service.OrderDetailReq, U extends Service.OrderDetailRes>(params: T) => {
  return await Service.request<T, U>({ method: 'get', url: '/orderDetail', params })
}
