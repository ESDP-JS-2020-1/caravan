import {store} from "./store/configureStore";

export const checkPermission = (permit) => {
    const user = store.getState().users.user;
    let permissions = new Set();
    user && user.group && user.group.forEach(p => (p.permissions.forEach(permit => (permissions.add(permit)))));
    permissions = [...permissions];

    return permissions.includes(permit)
};