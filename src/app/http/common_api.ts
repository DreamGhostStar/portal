import { backIP } from "app/components/common/config"
import { getHeaders } from "app/components/common/utils"
import Http from "./Servies"

export interface IGetPictrueApi {

}

// 修改用户信息
export const get_upload_token_api = async ()=>{
    return await Http.request(`${backIP}/pictureToken`, {}, 'GET', getHeaders())
}