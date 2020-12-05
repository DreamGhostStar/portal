import { backIP } from "app/components/common/config"
import { getHeaders } from "app/components/common/utils"
import Http from "./Servies"

interface IQuestionList {
    page: number;
}

interface IQuestionContent {
    id: number;
}

interface ISubject {
    id: number;
    radioValue?: number; // 单选框值
    checkBoxValue?: number[]; // 多选框的值
    textValue?: string; // 文本框的值
    type: string; // 题目类型
}

interface ISubmitQuestion {
    id: number;
    values: ISubject[]
}

// 获取问卷列表（前台）
export const get_question_list_api = async (data: IQuestionList) => {
    return await Http.request(`${backIP}/question/list`, data, 'GET', getHeaders())
}

// 获取问卷详情（前台）
export const get_question_content_api = async (data: IQuestionContent) => {
    return await Http.request(`${backIP}/question`, data, 'GET', getHeaders())
}

// 提交问卷
export const submit_question_api = async (data: ISubmitQuestion) => {
    return await Http.request(`${backIP}/question/commit`, data, 'POST', getHeaders())
}