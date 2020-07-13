import React, { useState } from 'react'
import { IconFont } from '../common/config';
import 'app/styles/homeSeconds/relationCard.scss'
const stylePrefix = 'home-relationCard'

export default function RelationCard({ data }: { data: any }) {
    const [mouseIndex, setMouseIndex] = useState(null)
    return (
        <div
            style={{
                height: (data.id === 1 ? 260 : 220),
                top: (mouseIndex === data.id ? -30 : 0)
            }}
            className={`${stylePrefix}-main`}
            onMouseOver={() => { setMouseIndex(data.id) }}
            onMouseOut={() => { setMouseIndex(null) }}
        >
            <div className={`${stylePrefix}-icon-layout`}>
                <IconFont type={data.iconURL} className={`${stylePrefix}-icon`} />
            </div>
            <div className={`${stylePrefix}-title`}>{data.title}</div>
            <div className={`${stylePrefix}-line`}></div>
            {
                data.id === 1
                    ? <div className={`${stylePrefix}-decoration-layout`}>
                        <div className={`${stylePrefix}-decoration`}>{data.decoration}</div>
                        <div className={`${stylePrefix}-decoration`}>{data.decoration1}</div>
                        <div className={`${stylePrefix}-decoration`}>{data.decoration2}</div>
                    </div>
                    : <div className={`${stylePrefix}-decoration-layout`}>
                        <div className={`${stylePrefix}-decoration`}>{data.decoration}</div>
                    </div>
            }
            <div
                style={{
                    backgroundColor: (mouseIndex === data.id ? '#000' : '#fff'),
                    opacity: (mouseIndex === data.id ? 1 : 0),
                }}
                className={`${stylePrefix}-bottom-line`}
            ></div>
        </div>
    )
}