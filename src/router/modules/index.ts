import { RouteRecordRaw } from 'vue-router';
const modulesFiles: any = import.meta.globEager("/src/router/modules/**/*.ts");

export default Object.keys(modulesFiles).reduce((prev: RouteRecordRaw[], pathName: string) => {
    prev = [...prev, ...modulesFiles[pathName].default];
    return prev;
}, []).sort((a, b) => a.sort && b.sort ? a.sort - b.sort : -1);