import { Ref } from "vue";

declare global {
    namespace Store {
        interface Settings {
            isCollapse: boolean;
            device: string;
            opened: boolean;
        }
        interface RefSettings {
            isCollapse: Ref<boolean>;
            device: Ref<string>;
            opened: Ref<boolean>;
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
}

