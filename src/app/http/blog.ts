import { backIP } from "app/components/common/config";
import Http from "app/http/Servies";

interface IGetListBolgApi {
    type: number;
    page: number;
    userID?: number;
}

interface IDeleteBlogApi {
    articleID: number;
}

interface ISearchBlogApi {
    inputData: string;
}

// 获取博客列表
export const get_list_blog_api = async (data: IGetListBolgApi) => {
    return await Http.request(`${backIP}/blog`, data, 'GET')
}

// 删除文章
export const delete_blog_api = async (data: IDeleteBlogApi) => {
    return await Http.request(`${backIP}/blog/delete`, data, 'POST')
}

// 获取文章详细信息
export const get_blog_detail_api = async (data: IDeleteBlogApi) => {
    return await Http.request(`${backIP}/blog/article`, data, 'GET')
}

// 搜索文章
export const search_blog_api = async (data: ISearchBlogApi) => {
    return await Http.request(`${backIP}/blog/search`, data, 'GET')
}