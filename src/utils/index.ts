export const getUserInfo = (): string | null => {
    return JSON.parse(sessionStorage.getItem('userInfo') as string);
}

export const getToken = (): string | null => {
    return sessionStorage.getItem('token') || null;
}

export const getRoleIdList = (): Array<number> => {
    return JSON.parse(sessionStorage.getItem('roleIdList') as string)?.map((v: string | number) => +v) ?? [];
}

export const setData = (data: object = {}) => {
    for (const key in data) {
        sessionStorage.setItem(key, data[key as keyof object]);
    }
}

export const removeStorage = (...data: Array<string>): boolean => {
    data.forEach(key => {
        sessionStorage.removeItem(key);
    });
    return true;
}

export const setLang = (lang: string) => {
    sessionStorage.setItem('lang', lang)
}