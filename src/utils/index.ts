export const getUserInfo = () :string | null => {
    return sessionStorage.getItem('userInfo') || null;
}

export const getToken = () :string | null => {
    return sessionStorage.getItem('token') || null;
}


export const getRoleIdList = () :any => {
    return sessionStorage.getItem('roleIdList') || [];
}

export const setData = (data = {}) => {
    for (const key in data) {
        // @ts-ignore
        sessionStorage.setItem(key, data[key]);
    }
}

export const removeStorage = (...data: Array<string>) :boolean => {
    data.forEach(key => {
        sessionStorage.removeItem(key);
    });
    return true;
}

export const setLang = (lang:string) => {
    sessionStorage.setItem('lang', lang)
}