namespace Store {
    interface Settings {
        isCollapse: boolean;
        device: string;
        opened: boolean;
    }
    interface RefSettings {
        isCollapse: import('vue').Ref<boolean>;
        device: import('vue').Ref<string>;
        opened: import('vue').Ref<boolean>;
        setOpened(data: boolean): void;
        setCollapse(data: boolean): void;
    }
}

