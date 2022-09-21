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
    type Record<K, T> = {
        [P in K]: T;
    }

    /**
     * @method Require
     * @descrption 动态key、value类型,但是都有属性皆为必选，没有可选属性
     */
     type Require<T> = {
        [P in keyof T]-?: T[P];
    }

    /**
     * @method Readonly
     * @descrption 动态key、value类型,等同于加上readonly(只读)
     */
     type Readonly<T> = {
        [P in keyof T]-?: T[P];
    }

    /**
     * @method Pick
     * @descrption 动态key、value类型,只返回指定的key(K)
     */
     type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    }

    /**
     * @method Exclude
     * @descrption 如果 T 是 U 的子类型则返回 never 不是则返回 T
     */
     type Exclude<T, U> = T extends U ? never : T;

    /**
     * @method Extract
     * @descrption 和 Exclude 相反
     */
     type Extract<T, U> = T extends U ? T : never;

    /**
     * @method Omit
     * @descrption 动态key、value类型,该类型拥有 T 中除了 K 属性以外的所有属性
     */
     type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>

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
