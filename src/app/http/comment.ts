import { backIP } from "app/components/common/config"
import { getHeaders } from "app/components/common/utils"
import Http from "./Servies"

interface ICommentList {
    articleID: number
}

interface IAddComment {
    articleID: number;
    content: string;
    userID: number;
    parentCommentID: number;
}

interface IDeleteComment {
    commentID: number;
}

// 获取评论列表
export const get_comment_list_api = async (data: ICommentList)=>{
    return await Http.request(`${backIP}/comment`, data, 'GET', getHeaders())
}

// 增加评论
export const add_comment_api = async (data: IAddComment)=>{
    return await Http.request(`${backIP}/comment`, data, 'POST', getHeaders())
}

// 删除评论
export const delete_comment_api = async (data: IDeleteComment)=>{
    return await Http.request(`${backIP}/comment`, data, 'DELETE', getHeaders())
}