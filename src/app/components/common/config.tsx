import {
    message
} from 'antd';
import { createFromIconfontCN } from '@ant-design/icons';
import { _getUserDetail } from './Api';

// 以下三个均为antd的信息提示
export function error(msg: string) {
    message.error(msg);
}

export function success(msg: string) {
    message.success(msg);
}

export function info(msg: string) {
    message.info(msg);
};

// 在进入页面时，需要进行token验证，并且需将返回数据传给store
// transform_user为redux传递数据函数，history为react-router-dom的路由函数，isMustCallback表示当前页面是否需要用户信息
export async function getUser(transform_user: any, history: any, isMustCallback: any) {
    const res = await _getUserDetail();

    if (res) {
        if (res.data.code === 0) {
            transform_user(res.data.data)
        } else {
            if (isMustCallback) {
                error('token验证失败，页面将在1秒后跳转至登录页面')
                setTimeout(() => {
                    history.push('/login')
                }, 1000);
            }
        }
    }
}

// 通过id获取year字符串
export function getYearStr(years: Array<any>, id: number): string {
    let yearStr: string = '';
    for (let index = 0; index < years.length; index++) {
        if (years[index].id === id) {
            yearStr = years[index].content
            break;
        }
    }
    return yearStr;
}

export const IconFont = createFromIconfontCN({
    scriptUrl: 'http://at.alicdn.com/t/font_1616893_37gsgxe4pbk.js',
});

export const maxLength: number = 16

export const QINIU_SERVER: string = 'http://upload.qiniup.com'

export const BASE_QINIU_URL: string = 'http://q8oal0d13.bkt.clouddn.com/'

export interface storeConfig {
    type: number,
    page: number,
    user: any
}

export interface userConfig {
    id: number,
    username: string,
    avatar: string,
    motto: string,
    nickname: string,
    email: string,
    year: string,
    role: number,
    permissions: string[],
    token: string
}