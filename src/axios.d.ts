import { AxiosResponse } from 'axios';
declare module 'axios' {
    interface AxiosResponse {
        code: number;
        message: string;
    }
}