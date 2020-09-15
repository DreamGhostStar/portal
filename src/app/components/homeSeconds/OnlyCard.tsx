import React from 'react'
import 'app/styles/homeSeconds/onlyCard.scss'
import { isMobile } from '../common/utils'
const stylePrefix = 'home-onlyCard'

interface onlyCardDataConfig {
    data: any,
    scrollIndex: number,
    index: number
}

export default function OnlyCard({ data, scrollIndex, index }: onlyCardDataConfig) {
    return (
        <>
            {
                isMobile()
                    ? <div className={`${stylePrefix}-mobile-main`}>
                        {/* TODO:需要修改图片 */}
                        <img src={data.URL} alt="图片" className={`${stylePrefix}-mobile-img`} />
                        <div>
                            <div className={`${stylePrefix}-title`}>{data.title}</div>
                            <div className={`${stylePrefix}-description`}>{data.description}</div>
                        </div>
                    </div>
                    : <div className={`${stylePrefix}-main`}>
                        <img src={data.URL} alt="图片" className={`${stylePrefix}-img`} />
                        <div className={`${stylePrefix}-words`}>
                            <div
                                style={{
                                    top: (scrollIndex === 1 ? 0 : -50),
                                    transitionDelay: `${(index * 1)}s`,
                                }}
                                className={`${stylePrefix}-title`}
                            >
                                {data.title}
                            </div>
                            <div
                                style={{
                                    top: (scrollIndex === 1 ? 0 : 50),
                                    transitionDelay: `${(index * 1)}s`,
                                }}
                                className={`${stylePrefix}-description`}
                            >
                                {data.description}
                            </div>
                            <div className={`${stylePrefix}-shadow`}></div>
                        </div>
                    </div>
            }
        </>
    )
}