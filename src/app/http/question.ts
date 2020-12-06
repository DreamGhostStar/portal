import { backIP } from "app/components/common/config"
import { getHeaders } from "app/components/common/utils"
import { subjectItemConfig } from "app/components/question/CreateQuestionContent"
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

// 增加问卷样板
interface IAddQuestionTemplate {
    title: string,
    abstract: string, // 概要
    startTime: string,
    abortTime: string, // 截止时间
    content: subjectItemConfig[]
}

// 删除问卷样板
interface IDeleteQuestionTemplate {
    id: number;
}

// 获取问卷列表（前后台）
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

// 创建问卷样板
export const add_question_template_api = async (data: IAddQuestionTemplate) => {
    return await Http.request(`${backIP}/question`, data, 'POST', getHeaders())
}

// 修改问卷样板
export const alter_question_template_api = async (data: IAddQuestionTemplate & { id: number }) => {
    return await Http.request(`${backIP}/question`, data, 'PUT', getHeaders())
}

// 删除问卷样板
export const delete_question_template_api = async (data: IDeleteQuestionTemplate) => {
    return await Http.request(`${backIP}/question`, data, 'DELETE', getHeaders())
}