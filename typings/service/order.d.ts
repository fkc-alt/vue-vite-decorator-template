namespace Service {
    interface OrderListReq {
        current: number;
        pageSize: number;
    }
    interface OrderListRes {
        orderList: Array<Item>;
    }   
    interface Item {
        name: string;
        stock: number;
        orderId: string;
        price: number;
    }
}
