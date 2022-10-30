declare namespace Service {
  interface ArticleItem {
    id: string | number
    description: string
    title: string
    content: string
    status: number
  }
  interface ArticleListRes {
    articleList: ArticleItem[]
  }
}
