export const USER_KEY = "@user-inkneedle";
export const isAuthenticated = () => localStorage.getItem(USER_KEY) !== null;

export const getToken = () => {
    const userStr = localStorage.getItem(USER_KEY);
    
    if (!userStr) {
        return null;
    }     

    const currentUser = JSON.parse(userStr);

    return currentUser.token;
};

export const getUser = () => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) {
        return null;
    }

    return JSON.parse(userStr);
};

export const setAvatarUser = (avatarUrl) => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) {
        return null;
    }

    let user = JSON.parse(userStr);
    user.avatar.url = avatarUrl;

    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const setUser = ({name, email, phones}) => {
    const userStr = localStorage.getItem(USER_KEY);
    if (!userStr) {
        return null;
    }

    let user = JSON.parse(userStr);
    user.name = name;
    user.email = email;
    user.phones = phones;

    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const login = payload => {
    const currentUser = Object.assign({}, payload.user, { token: payload.access_token });
    localStorage.setItem(USER_KEY, JSON.stringify(currentUser));
    localStorage.setItem('@user-loc',JSON.stringify({lat : 0, lng : 0}));
};

export const logout = () => {
    localStorage.removeItem(USER_KEY);
};