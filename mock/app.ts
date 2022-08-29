import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/rsapi/login',
        method: 'post',
        response: (): Service.LoginRes => {
            return {
                code: 200,
                message: '成功',
                token: 'Success Token'
            }
        }
    },
    {
        url: '/rsapi/orderList',
        method: 'post',
        response: (): Service.OrderListRes => {
            return {
                code: 200,
                message: '成功',
                orderList: [
                    {
                        name: '测试',
                        stock: 200,
                        orderId: '123',
                        price: 999
                    }
                ]
            }
        }
    }
] as MockMethod[]