import { AxiosResponse } from 'axios';
declare module 'axios' {
    interface AxiosResponse {
        code: number | string;
        message: string;
    }
}