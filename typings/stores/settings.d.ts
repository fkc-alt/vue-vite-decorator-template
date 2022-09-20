namespace Store {
    type Data<T = {}> = {
        isCollapse: T extends Ref ? Ref<boolean> : boolean;
        device: T extends Ref ? Ref<string> : string;
        opened: T extends Ref ? Ref<boolean> : boolean;
    }
    type Methods = {
        setOpened(data: boolean): void;
        setCollapse(data: boolean): void;
    }
    type Ref<T = any> = import('vue').Ref<T>;
    type Settings<T> = T extends Ref ? Common.Partial<Data<T> & Methods> : Common.Partial<Data>;
}

