namespace Store {
    type Ref<T = any> = import('vue').Ref<T>;
    type Options<T = {}> = {
        isCollapse: T extends Ref ? Ref<boolean> : boolean;
        device: T extends Ref ? Ref<string> : string;
        opened: T extends Ref ? Ref<boolean> : boolean;
        setOpened(data: boolean): void;
        setCollapse(data: boolean): void;
    }
    type Settings<T> = T extends Ref ? Options<T> : Common.Omit<Options, 'setOpened' | 'setCollapse'>
}

