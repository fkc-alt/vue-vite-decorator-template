type StroageType = {
    [key: string]: any;
}

export const getUserInfo = (): string | null => {
    return JSON.parse(sessionStorage.getItem('userInfo') as string);
}

export const getToken = (): string => {
    return sessionStorage.getItem('token') || '';
}

export const getRoleIdList = (): Array<number> => {
    return (sessionStorage.getItem('roleIdList') as string)?.split(',').map((v: string | number) => +v) ?? [];
}

export const setData = (data: StroageType) => {
    for (const key in data) {
        sessionStorage.setItem(key, data[key]);
    }
}

export const removeStorage = (...data: Array<string>): boolean => {
    data.forEach(key => sessionStorage.removeItem(key));
    return true;
}

export const setLang = (lang: string) => {
    sessionStorage.setItem('lang', lang)
}