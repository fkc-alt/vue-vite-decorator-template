import { MockMethod } from 'vite-plugin-mock';
export default [
    {
        url: '/rsapi/login',
        method: 'post',
        response: () => {
            return {
                code: 200,
                message: '成功',
                data: { token: 'Success Token' }
            }
        }
    }
] as MockMethod[]