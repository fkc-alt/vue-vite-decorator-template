namespace Service {
    interface TableDataReq extends Record<'currentPage' | 'pageSize', number> { }
    type RecordTableList = Record<'date' | 'name' | 'address', string>[];
    interface TableDataRes {
        tableList: RecordTableList;
    }
}