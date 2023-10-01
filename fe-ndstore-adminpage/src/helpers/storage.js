export const setLocalItem = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalItem = (key) => {
    let result
    const dataString = localStorage.getItem(key);
    if (typeof dataString === 'string') result = dataString;

    return result;
};

export const removeLocalItem = (key) => {
    localStorage.removeItem(key);
};