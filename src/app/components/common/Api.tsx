import axios from 'axios'
import cookies from 'react-cookies'

// const backIP: string = 'http://47.93.201.127:5748/api'

// 获取token
function getToken() {
    const token = cookies.load('Authorization')

    if (!token) {
        return null;
    }

    const headersToken = {
        'Authorization': token
    }

    return headersToken;
}

// 进入404页面
function entry404() {
    // window.location.href = '/#/404'
}

// 获取验证码接口
export function _verificationCode() {
    return axios.get(`/api/captcha`).catch(function () {
        entry404()
    })
}

// 注册接口
export function _enroll(data: any) {
    return axios.post(`/api/user/register`, data).catch(function () {
        entry404()
    })
}

// 登录接口
export function _login(data: any) {
    return axios.post('/api/user/login', data).catch(function () {
        entry404()
    })
}

// 获取列表文章接口
export function _getBlog(data: any) {
    return axios.get(`/api/blog`, {
        params: data,
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 删除指定文章接口
export function _deleteArticle(data: any) {
    return axios.post(`/api/blog/delete`, data, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 新增文章接口
export function _addArticle(data: any) {
    return axios.post(`/api/blog/add`, data, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 获取文章具体信息接口
export function _getArticleDetail(data: any) {
    return axios.get(`/api/blog/article`, {
        params: data,
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 获用户具体信息接口
export function _getUserDetail() {
    return axios.get(`/api/user/info`, {
        headers: getToken()
    })
}

// 获取评论接口
export function _getCommentList(data: any) {
    return axios.get(`/api/blog/comments`, {
        params: data,
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 发表评论接口
export function _publishComment(data: any) {
    return axios.post(`/api/blog/comment/publish`, data, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 修改用户信息接口
export function _alterUserInfo(data: any) {
    return axios.post(`/api/user/alter`, data, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 获取上传图片token接口
export function _getPictureToken() {
    return axios.get(`/api/pictureToken`, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 获取消息列表接口
export function _getMessageData() {
    return axios.get(`/api/blog/message/list`, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 获取未读消息数量接口
export function _getMessageNum() {
    return axios.get(`/api/blog/home/unread`, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}

// 将消息已读接口
export function _readMessage(data: any) {
    return axios.post(`/api/blog/message/material`, data, {
        headers: getToken()
    }).catch(function () {
        entry404()
    })
}