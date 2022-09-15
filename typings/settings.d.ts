namespace Store {
    interface Settings {
        isCollapse: boolean;
        device: string;
        opened: boolean;
    }
    interface RefSettings<T> {
        isCollapse: T<boolean>;
        device: T<string>;
        opened: T<boolean>;
        setOpened(data: boolean): void;
        setCollapse(data: boolean): void;
    }
}
namespace Common {
    interface Response<T> {
        code: number;
        message: string;
        data: T
    }
}

