import store from "redux/store";
import cookies from 'react-cookies'

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

// 深拷贝
export const deepCopy = (variate: any): any => {
    return JSON.parse(JSON.stringify(variate))
}

// 获取jwt的token
export const getToken = (): string => {
    return cookies.load('Authorization')
}

// 根据ua判断使用的终端设备
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

// 判断是否为手机
export const isMobile = () => {
    return browser.versions.mobile ? true : false;
}

// 动态修改rem的值
export const setRemUnit = () => {
    const radio = 18.75; // 375 / 18.75, 1rem = 20px
    const docElem = document.documentElement;
    const viewWidth = docElem.getBoundingClientRect().width || window.innerWidth;
    docElem.style.fontSize = viewWidth / radio + 'px';
}

// 判断用户是否登录
export const isLogin = () =>{
    if(store.getState().user && cookies.load('Authorization')) {
        return true
    }

    return false;
}