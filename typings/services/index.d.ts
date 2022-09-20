namespace Common {
    /**
     * @method Partial
     * @descrption 动态key、value类型
     */
    type Partial<T> = {
        [P in keyof T]: T[P];
    }
    /**
     * @method Record
     * @descrption 动态key类型
     */
    type Record<K extends string | symbol | number, T> = {
        [P in K]: T;
    }
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
