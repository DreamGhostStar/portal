import { backIP } from "app/components/common/config";
import { getHeaders } from "app/components/common/utils";
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

export interface IUserDetailApi {
    userID?: number;
}

export interface IAlterUserInfoApi {
    nickname: string;
    avatar: string;
    grade: string;
    motto: string;
    email: string;
}

export interface IDeleteUserInfoApi {
    userID: number;
}

export interface IAlterUserRoleApi {
    userID: number;
    role: number;
}

export interface IAlterUserNicknameApi {
    userID: number;
    nickname: string;
}

// 获取首页用户列表
export const get_friend_api = async () => {
    return await Http.request(`${backIP}/user/members`, {}, 'GET')
}

// 登录接口
export const login_api = async (data: ILoginApi) => {
    return await Http.request(`${backIP}/user/login`, data, 'POST')
}

// 注册接口
export const enroll_api = async (data: IEnrollApi) => {
    return await Http.request(`${backIP}/user/register`, data, 'POST')
}

// 获取用户信息
export const get_user_detail_api = async (data: IUserDetailApi) => {
    return await Http.request(`${backIP}/user/info`, data, 'GET', getHeaders())
}

// 修改用户信息
export const alter_user_info_api = async (data: IAlterUserInfoApi) => {
    return await Http.request(`${backIP}/user/alter`, data, 'POST', getHeaders())
}

// 管理员修改用户信息
export const admin_alter_user_info_api = async (data: IAlterUserInfoApi & { userID: number }) => {
    return await Http.request(`${backIP}/admin/user`, data, 'PUT', getHeaders())
}

// 管理员删除用户
export const admin_delete_user_info_api = async (data: IDeleteUserInfoApi) => {
    return await Http.request(`${backIP}/admin/user`, data, 'DELETE', getHeaders())
}

// 管理员修改用户权限
export const admin_alter_user_role_api = async (data: IAlterUserRoleApi) => {
    return await Http.request(`${backIP}/admin/user/role`, data, 'PUT', getHeaders())
}

// 管理员修改用户昵称
export const admin_alter_user_nickname_api = async (data: IAlterUserNicknameApi) => {
    return await Http.request(`${backIP}/admin/user/nickname`, data, 'PUT', getHeaders())
}