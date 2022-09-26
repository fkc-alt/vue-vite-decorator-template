namespace Services.Common {
    /**
     * @method Response
     * @descrption 请求返回类型
     */
    interface Response<T = any> {
        readonly code: number | string;
        readonly message: string;
        data: T;
    }
}
