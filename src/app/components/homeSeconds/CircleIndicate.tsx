import React from 'react'
import 'app/styles/homeSeconds/circleIndicate.scss'
interface circleIndicateDataConfig {
    turnIndex: number,
    index: number,
    handleChangePage: any
}

export default function CircleIndicate({ turnIndex, index, handleChangePage }: circleIndicateDataConfig) {
    return (
        <div className='home-circleIndicate-main'
            style={{
                backgroundColor: (turnIndex === index ? '#ddd' : '#fff')
            }}
            onClick={() => handleChangePage(index)}
        ></div>
    )
}