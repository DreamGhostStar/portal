import { backIP } from "app/components/common/config";
import Http from "app/http/Servies";

export interface ILoginApi {
    key?: string;
    password?: string;
}

export interface IEnrollApi {
    username?: string;
    password?: string;
    captcha?: string;
}

// 获取首页用户列表
export const get_friend_api = async () => {
    return await Http.request(`${backIP}/user/members`, {}, 'GET')
}

// 登录接口
export const login_api = async (data: ILoginApi)=>{
    return await Http.request(`${backIP}/user/login`, data, 'POST')
}

// 注册接口
export const enroll_api = async (data: IEnrollApi)=>{
    return await Http.request(`${backIP}/user/register`, data, 'POST')
}