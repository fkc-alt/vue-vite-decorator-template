import { RouteRecordRaw } from 'vue-router';
const modulesFiles: any = import.meta.globEager("/src/router/modules/**/*.ts");

const modules = Object.keys(modulesFiles).reduce((prev: RouteRecordRaw[], pathName: string) => {
    prev = [...prev, ...modulesFiles[pathName].default];
    return prev;
}, []).sort((a, b) => a.sort && b.sort ? a.sort - b.sort : -1);

export default modules;