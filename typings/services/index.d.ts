namespace Common {
    interface Response<T = any> {
       readonly code: number | string;
       readonly message: string;
       data: T
    }
}
