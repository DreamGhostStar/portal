import React from 'react'
interface circleIndicateDataConfig {
    turnIndex: number,
    index: number,
    handleChangePage: any
}

export default function CircleIndicate({ turnIndex, index, handleChangePage }: circleIndicateDataConfig) {
    return (
        <div style={{
            width: 20,
            height: 20,
            borderRadius: '50%',
            float: 'left',
            marginRight: 30,
            border: '1px solid #ddd',
            backgroundColor: (turnIndex === index ? '#ddd' : '#fff'),
            cursor: 'pointer'
        }} onClick={() => handleChangePage(index)}></div>
    )
}