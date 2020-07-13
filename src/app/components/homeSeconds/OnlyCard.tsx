import React, { useState } from 'react'
import 'app/styles/homeSeconds/onlyCard.scss'
const stylePrefix = 'home-onlyCard'

interface onlyCardDataConfig {
    data: any,
    scrollIndex: number,
    index: number
}

export default function OnlyCard({ data, scrollIndex, index }: onlyCardDataConfig) {
    return (
        <div className={`${stylePrefix}-main`}>
            <img src={data.URL} alt="xxx" className={`${stylePrefix}-img`} />
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
    )
}