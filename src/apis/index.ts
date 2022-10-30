import Service from '@/utils/service'

export const Login = async <T extends Service.LoginReq, U extends Service.LoginRes>(data: T) => {
  return await Service.request<T, U>({ method: 'post', url: '/user/login', data })
}

export const GetArticleList = async <T = unknown, U = Service.ArticleListRes>() => {
  return await Service.request<T, U>({ method: 'get', url: 'article/getArticleList' })
}

export const GetTableDataList = async <T = unknown, U = Service.TableDataRes>() => {
  return await Service.request<T, U>({ method: 'post', url: 'tableData' })
}
