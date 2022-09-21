import Mock from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: `/rsapi/login`,
        method: 'post',
        response: (req: any): Common.Response<Service.LoginRes> => {
            let code = 200, message = '成功';
            if(req.body?.username !== 'system' || req.body?.password !== '12345678') {
                code = -1;
                message = '用户名或密码不正确';
            }
            return {
                code,
                message,
                data: { token: Mock.Random.string(25, 50), roles: [101, 100] }
            }
        }
    },
    {
        url: `/rsapi/tableData`,
        method: 'post',
        response: (): Common.Response<Service.TableDataRes> => {
            return {
                code: 200,
                message: '成功',
                data: { 
                    tableList: [
                        {
                            date: '2016-05-03',
                            name: 'Tom',
                            address: 'No. 189, Grove St, Los Angeles',
                          },
                          {
                            date: '2016-05-02',
                            name: 'Tom',
                            address: 'No. 189, Grove St, Los Angeles',
                          },
                          {
                            date: '2016-05-04',
                            name: 'Tom',
                            address: 'No. 189, Grove St, Los Angeles',
                          },
                    ]
                }
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
    },
    {
        url: `/rsapi/orderDetail`,
        method: 'get',
        response: (): Common.Response<Service.OrderDetailRes> => {
            return {
                code: 200,
                message: '成功',
                data: {
                    price: 1999,
                    name: '测试',
                    stock: 1000,
                    orderId: '111'
                }
            }
        }
    }
] as MockMethod[]