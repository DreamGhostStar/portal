import store from "redux/store";
import cookies from 'react-cookies'

export const formatTime = (createTime: string): string => {
    let tempDate = new Date(Number(createTime));
    let year = tempDate.getFullYear();
    let month = tempDate.getMonth() + 1;
    let date = tempDate.getDate();
    let hour = tempDate.getHours();
    let minute = tempDate.getMinutes();
    let seconds = tempDate.getSeconds()
    return `${year}-${month}-${date} ${hour}:${minute}:${seconds}`
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

export const getToken = (): string => {
    return cookies.load('Authorization')
}

export const browser = {
    versions: function () {
        var u = navigator.userAgent, app = navigator.appVersion;
        return {     //移动终端浏览器版本信息
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或uc浏览器
            iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1 //是否web应该程序，没有头部与底部
        };
    }(),
    language: navigator.language.toLowerCase()
}

export const isMobile = () => {
    return browser.versions.mobile ? true : false;
}

export const setRemUnit = () => {
    const radio = 18.75; // 375 / 18.75, 1rem = 20px
    const docElem = document.documentElement;
    const viewWidth = docElem.getBoundingClientRect().width || window.innerWidth;
    docElem.style.fontSize = viewWidth / radio + 'px';
}