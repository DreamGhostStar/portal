import React, { useState } from 'react'
import avatorURL from '../../../images/profile photo.jpg'
import { IconFont } from './config';
import 'app/styles/comon/personDatailShow.scss'
import { membersConfig } from '../homeSeconds/TableShowContent';
interface personDetailShowDataConfig {
    cancelShowDetail: any,
    item: membersConfig
}
const stylePrefix = 'blog-commentShow'

export default function PersonDetailShow({ cancelShowDetail, item }: personDetailShowDataConfig) {
    const [isMouse, setIsMouse] = useState(false)
    return (
        <div className={`${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-main`}>
                <div
                    style={{
                        backgroundColor: (isMouse ? '#f00' : 'transparent')
                    }}
                    onMouseOver={() => { setIsMouse(true) }}
                    onMouseOut={() => { setIsMouse(false) }}
                    className={`${stylePrefix}-close-layout`}
                >
                    <IconFont type="anticoncha" className={`${stylePrefix}-close-icon`} onClick={cancelShowDetail} />
                </div>
                <img src={avatorURL} alt="头像" className={`${stylePrefix}-avatar`} />
                <div className={`${stylePrefix}-realName`}>{item.realName}</div>
                <div className={`${stylePrefix}-year`}>
                    <span>年份：</span>
                    {item.year}
                </div>
                <div className={`${stylePrefix}-motto`}>
                    {item.motto}
                </div>
            </div>
        </div>
    )
}