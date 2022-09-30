namespace Service {
    interface ArticleListRes {
        articleList: {
            id: string | number;
            description: string;
            title: string;
            content: string;
            status: number;
        }[];
    }
}