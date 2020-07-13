import React, { useState } from 'react'
import avatorURL from '../../../images/profile photo.jpg'
import PersonDetailShow from '../common/PersonDetailShow';
import 'app/styles/homeSeconds/personShow.scss'
const stylePrefix = 'home-personShow';

export default function PersonShow({ item }: { item: any }) {
    const [showDetail, setShowDetail] = useState(false)

    const handleClick = () => {
        setShowDetail(true)
    }

    const cancelShowDetail = () => {
        setShowDetail(false)
    }
    return (
        <>
            <div className={`${stylePrefix}-main`} onClick={(handleClick)}>
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
            <div
                style={{
                    opacity: (showDetail ? 0.1 : 0),
                    display: (showDetail ? 'block' : 'none'),
                }}
                className={`${stylePrefix}-shadow`}
            ></div>
            <div style={{
                display: (showDetail ? 'block' : 'none')
            }}>
                <PersonDetailShow item={item} cancelShowDetail={cancelShowDetail} />
            </div>
        </>
    )
}