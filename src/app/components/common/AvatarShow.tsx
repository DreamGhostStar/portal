import React from 'react'
import 'app/styles/comon/avatarShow.scss'
import { useHistory } from 'react-router-dom';
const stylePrefix = 'common-avatarShow'

interface AvatarShowConfig {
    src: string
    size?: number
    userID: number
}

export default function AvatarShow({ src, size = 80, userID }: AvatarShowConfig) {
    const history = useHistory();
    const entryUserPage= ()=>{
        history.push(`/user/${userID}`)
    }
    return (
        <img
            className={`${stylePrefix}-main`}
            src={src} 
            alt="头像"
            style={{
                width: size,
                height: size,
            }}
            onClick={entryUserPage}
        />
    )
}
