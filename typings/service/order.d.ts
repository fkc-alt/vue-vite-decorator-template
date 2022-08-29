namespace Service {
    interface OrderListReq {
        current: number;
        pageSize: number;
    }
    interface OrderListRes extends Common.Response {
        orderList: Array<Item>;
    }   
    interface Item {
        name: string;
        stock: number;
        orderId: string;
        price: number;
    }
}