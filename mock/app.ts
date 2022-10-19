import Mock, { Random } from 'mockjs';
import { MockMethod } from 'vite-plugin-mock';
import { create } from './utils';

const MockList: MockMethod[] = [
    {
        url: `/rsapi/user/login`,
        method: 'post',
        response: (req: any): Services.Common.Response<Service.LoginRes> => {
            let code = 200, message = '成功';
            if (req.body?.username !== 'system' || req.body?.password !== '12345678') {
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
        response: (): Services.Common.Response<Service.TableDataRes> => {
            return {
                code: 200,
                message: '成功',
                data: {
                    tableList: [
                        ...create<Service.TableDataRecord>(10, (_item) => {
                            return {
                                date: Random.date(),
                                name: Random.cname(),
                                address: Random.county(),
                            }
                        })
                    ]
                }
            }
        }
    },
    {
        url: `/rsapi/article/getArticleList`,
        method: 'get',
        response: (): Services.Common.Response<Service.ArticleListRes> => {
            return {
                code: 200,
                message: '成功',
                data: {
                    articleList: [
                        ...create<Service.ArticleItem>(10, (_item) => {
                            return {
                                id: Random.integer(1, 100000),
                                description: Random.csentence(),
                                title: Random.ctitle(5, 20),
                                content: Random.cparagraph(10, 20),
                                status: Random.integer(0, 3)
                            }
                        })
                    ]
                }
            }
        }
    },
    {
        url: `/rsapi/orderList`,
        method: 'post',
        response: (): Services.Common.Response<Service.OrderListRes> => {
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
        response: (): Services.Common.Response<Service.OrderDetailRes> => {
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
]

export default MockList;