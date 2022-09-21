namespace Service {
    interface TableDataReq {
        token: string;
    }
    type RecordTableList = Common.Record<'date' | 'name' | 'address', string>[];
    interface TableDataRes {
        tableList: RecordTableList;
    }
}