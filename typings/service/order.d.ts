namespace Service {
    interface Item {
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
        orderList: Array<Item>;
    }   
    interface OrderDetailReQ {
        orderId: string;
    }
    interface OrderDetailRes extends Item {}
}
