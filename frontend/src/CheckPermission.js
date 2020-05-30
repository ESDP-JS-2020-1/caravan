import {store} from "./store/configureStore";

export const checkPermission = (permit) => {
    const user = store.getState().users.user;
    return user && user.permissions && user.permissions.includes(permit)
};