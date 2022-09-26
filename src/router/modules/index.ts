import { RouteRecordRaw } from 'vue-router';
/**
 * @description “globEager”已弃用
 */
const modulesFiles = import.meta.glob("/src/router/modules/**/*.ts", { import: 'default', eager: true }) as { [key: string]: RouteRecordRaw[] }

const modules = Object.values(modulesFiles).reduce((prev, next) => {
    prev = [...prev, ...next];
    return prev;
}).sort((a, b) => a.sort && b.sort ? a.sort - b.sort : -1);

export default modules;