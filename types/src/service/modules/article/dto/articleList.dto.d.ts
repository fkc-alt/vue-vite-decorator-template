export declare class ArticleListParamDto {
  title: string
  status: number
  text: string
}
export declare class CheckDemoListDto implements Service.CheckDemoItem {
  name: string
  age: number
}
export default class ArticleListDto implements Service.ArticleListReq {
  channel: string[]
  pageSize: number
  currentPage: number
  param: ArticleListParamDto
  checkDemoList: CheckDemoListDto[]
  content: string
}
