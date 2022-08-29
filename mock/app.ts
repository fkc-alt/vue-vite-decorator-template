import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: '/rsapi/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: { token: 'Success Token' }
            }
        }
    },
    {
        url: '/rsapi/orderList',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: {
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
    }
] as MockMethod[]