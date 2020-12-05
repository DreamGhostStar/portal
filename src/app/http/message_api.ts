import { backIP } from "app/components/common/config"
import { getHeaders } from "app/components/common/utils"
import Http from "./Servies"

export interface IClickMessageApi {
    id: number;
}

export interface IGetMessageList {
    page: number;
}

// 获取未读消息
export const get_unread_api = async ()=>{
    return await Http.request(`${backIP}/blog/home/unread`, {}, 'GET', getHeaders())
}

// 点击消息
export const click_message_api = async (data: IClickMessageApi)=>{
    return await Http.request(`${backIP}/blog/message/material`, data, 'POST', getHeaders())
}

// 获取消息列表
export const get_message_list_api = async (data: IGetMessageList)=>{
    return await Http.request(`${backIP}/blog/message/list`, data, 'GET', getHeaders())
}