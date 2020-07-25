import React, { useState } from 'react'
import avatorURL from '../../../images/profile photo.jpg'
import PersonDetailShow from '../common/PersonDetailShow';
import 'app/styles/homeSeconds/personShow.scss'
import { membersConfig } from './TableShowContent';
const stylePrefix = 'home-personShow';

interface PersonShowConfig {
    item: membersConfig,
    showDetail: {
        (member: membersConfig): void
    }
}

export default function PersonShow({ item, showDetail }: PersonShowConfig) {
    // const [showDetail, setShowDetail] = useState(false)

    // const handleClick = () => {
    //     setShowDetail(true)
    // }

    // const cancelShowDetail = () => {
    //     setShowDetail(false)
    // }
    return (
        <>
            <div className={`${stylePrefix}-main`} onClick={() => showDetail(item)}>
                <img src={avatorURL} alt="头像" className={`${stylePrefix}-img`} />
                <div className={`${stylePrefix}-words`}>
                    <div className={`${stylePrefix}-word-realname`}>
                        {item.realName}
                    </div>
                    <div className={`${stylePrefix}-word-motto`}>
                        {item.motto}
                    </div>
                </div>
            </div>
            {/* <div style={{
                display: (showDetail ? 'block' : 'none')
            }}>
                <PersonDetailShow item={item} cancelShowDetail={cancelShowDetail} />
            </div> */}
        </>
    )
}