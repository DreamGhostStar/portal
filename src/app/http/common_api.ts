import { backIP } from "app/components/common/config"
import { getHeaders } from "app/components/common/utils"
import Http from "./Servies"

// 获取上传图片的token
export const get_upload_token_api = async ()=>{
    return await Http.request(`${backIP}/pictureToken`, {}, 'GET', getHeaders())
}