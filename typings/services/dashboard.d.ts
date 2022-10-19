namespace Service {
    type ArticleItem = {
        id: string | number;
        description: string;
        title: string;
        content: string;
        status: number;
    }
    interface ArticleListRes {
        articleList: ArticleItem[];
    }
}