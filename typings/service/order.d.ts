namespace Service {
    interface OrderListReq {
        currentPage: number;
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
