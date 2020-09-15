import React from 'react'
import '../../styles/homeSeconds/imageShow.scss'

interface imageShowDataConfig {
    turnIndex: number,
    index: number,
    img: string,
    decoration: string
}

export default function ImageShow({ turnIndex, index, img, decoration }: imageShowDataConfig) {
    return (
        <div
            style={{
                // display: index === 1 ? 'block' : 'none', // TODO: 需要删除
                left: (turnIndex === index ? `0px` : '-720px'),
                opacity: (turnIndex === index ? 1 : 0),
                zIndex: (turnIndex === index ? 99 : 1),
            }}
            className="imageShow"
        >
            <img src={img} alt={decoration} className='imageShow_img' />
        </div>
    )
}
