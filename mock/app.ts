import { Random } from 'mockjs'
import { MockMethod, Recordable } from 'vite-plugin-mock'
import { create } from './utils'

const MockList: MockMethod[] = [
  {
    url: '/web/v1/login',
    method: 'post',
    response: (req: Recordable): Services.Common.Response<Service.LoginRes> => {
      let code = 200
      let msg = '成功'
      if (
        req.body?.username !== 'system' ||
        req.body?.password !== '12345678'
      ) {
        code = -1
        msg = '用户名或密码不正确'
      }
      return {
        code,
        msg,
        data: { token: Random.string(25, 50), authorities: [101, 99] }
      }
    }
  },
  {
    url: '/web/product/v1/add',
    method: 'post',
    response: (req: Recordable): Services.Common.Response<Service.LoginRes> => {
      let code = 200
      let msg = '成功'
      if (
        req.body?.username !== 'system' ||
        req.body?.password !== '12345678'
      ) {
        code = -1
        msg = '用户名或密码不正确'
      }
      return {
        code,
        msg,
        data: { token: Random.string(25, 50), authorities: [101, 99] }
      }
    }
  },
  {
    url: '/web/user/info/{:id}/{:phone}',
    method: 'get',
    response: (
      req: Recordable
    ): Services.Common.Response<Service.UserInfoRes> => {
      return {
        code: 200,
        msg: '成功',
        data: {
          name: Random.cname(),
          point: Random.integer(0, 100000),
          registerTime: Random.time()
        }
      }
    }
  },
  {
    url: '/web/article/tableData',
    method: 'post',
    response: (): Services.Common.Response<any> => {
      return {
        code: 200,
        msg: '成功',
        data: {
          tableList: [
            ...create<any>(10, _item => {
              return {
                date: Random.date(),
                name: Random.cname(),
                address: Random.county()
              }
            })
          ]
        }
      }
    }
  },
  {
    url: '/web/article/getArticleList',
    method: 'post',
    response: (): Services.Common.Response<Service.ArticleListRes> => {
      return {
        code: 200,
        msg: '成功',
        data: {
          articleList: [
            ...create<Service.ArticleItem>(10, _item => {
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
    url: '/web/order/orderList',
    method: 'post',
    response: (): Services.Common.Response<any> => {
      return {
        code: 200,
        msg: '成功',
        data: {
          orderList: [
            ...create<Service.Order.OrderItem>(20, _item => {
              return {
                name: Random.cname(),
                orderId: `${Random.integer(1, 50)}${Random.string(2, 10)}`,
                stock: Random.integer(1, 100),
                price: Random.integer(100, 9999)
              }
            })
          ]
        }
      }
    }
  },
  {
    url: '/web/order/orderDetail',
    method: 'get',
    response: (): Services.Common.Response<any> => {
      return {
        code: 200,
        msg: '成功',
        data: create<Service.Order.OrderItem>(1, _item => {
          return {
            name: Random.cname(),
            orderId: `${Random.integer(1, 50)}${Random.string(2, 10)}`,
            stock: Random.integer(1, 100),
            price: Random.integer(100, 9999)
          }
        })[0]
      }
    }
  },
  {
    url: '/web/order/uploadFile',
    method: 'post',
    response: (): Services.Common.Response<Services.Common.UplaodRes> => {
      return {
        code: 200,
        msg: '成功',
        data: {
          url: 'https://img1.baidu.com/it/u=3527187906,1947135853&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1676998800&t=d87261632cf4313fcab070b28a78764f'
        }
      }
    }
  },
  {
    url: '/web/order/uploadBase64',
    method: 'post',
    response: (): Services.Common.Response<Services.Common.UplaodRes> => {
      return {
        code: 200,
        msg: '成功',
        data: {
          url: 'https://img1.baidu.com/it/u=3527187906,1947135853&fm=253&app=138&size=w931&n=0&f=JPEG&fmt=auto?sec=1676998800&t=d87261632cf4313fcab070b28a78764f'
        }
      }
    }
  },
  {
    url: '/web/helper/apidoc',
    method: 'post',
    response: (): Services.Common.Response<any> => {
      return {
        code: 200,
        msg: '成功',
        data: {
          apiList: [
            {
              path: 'login',
              params: { username: 'String', password: 'String' }
            }
          ]
        }
      }
    }
  }
]

export default MockList
