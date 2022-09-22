namespace Service {
    interface TableDataReq {
        token: string;
    }
    type RecordTableList = Record<'date' | 'name' | 'address', string>[];
    interface TableDataRes {
        tableList: RecordTableList;
    }
}