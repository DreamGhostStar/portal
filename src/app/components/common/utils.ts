import store from "redux/store";

export const formatTime = (createTime: string): string => {
    let tempDate = new Date(Number(createTime));
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let date = tempDate.getDate();
    let hour = tempDate.getHours();
    let minute = tempDate.getMinutes();
    return `${year}-${month}-${date} ${hour}:${minute}`
}

export const getReduxUser = () => {
    const {
        user
    } = store.getState();
    return user;
}

export const simpleFormatTime = (createTime: string): string => {
    let tempDate = new Date(Number(createTime));
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let date = tempDate.getDate();
    return `${year}-${month}-${date}`
}

export const deepCopy = (variate: any): any => {
    return JSON.parse(JSON.stringify(variate))
}