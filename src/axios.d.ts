import { AxiosResponse } from 'axios';
declare module 'axios' {
    interface AxiosResponse {
        code: number;
        message: string;
        data: T<any>
    }
}