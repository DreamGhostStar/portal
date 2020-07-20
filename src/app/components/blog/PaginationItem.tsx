import React, { useState } from 'react'
import '../../styles/blog/paginationItem.scss'

interface PaginationItemConfig {
    currentPage: number,
    index: number,
    handlePaginationItemData: any
}

export default function PaginationItem({ currentPage, index, handlePaginationItemData }: PaginationItemConfig, props: any) {
    const [isMouse, setIsMouse] = useState(false)
    const handleClick = () => {
        handlePaginationItemData(index);
        // 传给父组件，改变isClick数组的值
        props.transfrom_currentPage(index);
    }
    return (
        <div
            className="pageItem"
            style={{
                border: (isMouse || currentPage === (index) ? '1px solid #00CCFF' : '1px solid #ddd'),
                color: (isMouse || currentPage === (index) ? '#00CCFF' : '#000'),
                cursor: 'pointer'
            }}
            key={index - 1}
            onMouseOver={() => { setIsMouse(true) }}
            onMouseOut={() => { setIsMouse(false) }}
            onClick={handleClick}
        >
            {index}
        </div>
    )
}