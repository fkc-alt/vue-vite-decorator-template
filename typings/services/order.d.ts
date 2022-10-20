namespace Service {
    interface OrderItem {
        name: string;
        stock: number;
        orderId: string;
        price: number;
    }
    interface OrderListReq {
        currentPage: number;
        pageSize: number;
    }
    interface OrderListRes {
        orderList: Array<OrderItem>;
    }
    interface OrderDetailReq {
        orderId: string;
    }
    interface OrderDetailRes extends OrderItem { }

    type TableDataRecord = Record<"date" | "name" | "address", string>
    interface TableDataRes {
        tableList: TableDataRecord[];
    }
}
