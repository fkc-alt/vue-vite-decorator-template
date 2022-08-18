import { _RouteRecordBase, RouteMeta, RouteLocationMatched } from 'vue-router';
declare module 'vue-router' {
    interface _RouteRecordBase {
        hidden? : boolean;
        sort? : number;
        children? : Array;
        meta? : RouteMeta
    }
    interface RouteMeta {
        title?: string;
        icon?: string;
        roles?: Array<string | number>;
        alwaysShow?: boolean;
    }
    interface RouteLocationMatched {
        redirect?: string;
    }
    
}