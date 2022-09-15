import Mock from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';

export default [
    {
        url: `/rsapi/login`,
        method: 'post',
        response: (): Common.Response<Service.LoginRes> => {
            return {
                code: 200,
                message: '成功',
                data: Mock.mock({ "token": Mock.Random.string(25, 50) })
            }
        }
    },
    {
        url: `/rsapi/orderList`,
        method: 'post',
        response: (): Common.Response<Service.OrderListRes> => {
            return {
                code: 200,
                message: '成功',
                data: Mock.mock({
                    "orderList|1-10": [
                      {
                        "name|+1": ["Hello", "Mock.js", "!"],
                        "orderId|+1": ['1', '2', '3'],
                        "stock|+1": [10, 20, 30],
                        "price|+1": [199, 299, 399]
                      }
                    ]
                })
            }
        }
    }
] as MockMethod[]