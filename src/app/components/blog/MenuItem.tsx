import React, { useState } from 'react'
import '../../styles/blog/menuItem.scss'
import { useHistory } from 'react-router-dom'
import { IconFont } from '../common/config';

const stylePrefix = 'blog-menuItem'

interface MenuItemConfig {
    handleItemData: any,
    display: any[],
    index: number,
    clickIndex: number,
    item: any
}

export default function MenuItem({ handleItemData, display, index, clickIndex, item }: MenuItemConfig, props: any) {
    let history = useHistory();
    const [isMouse, setIsMouse] = useState(false)
    const handleClick = (index: number) => {
        // 传递给父组件
        handleItemData(index);
        // 传递store
        props.transfrom_type(index);
        history.push(`/blog/undefined`);
    }
    return (
        <div
            style={{
                height: (display[index] ? 47 : 0),
                backgroundColor: (isMouse || (clickIndex === index) ? '#0099FF' : '#66CCFF'),
                borderBottom: (display[index] ? '1px solid #6699FF' : 'none'),
            }}
            onMouseOver={() => { setIsMouse(true) }}
            onMouseOut={() => { setIsMouse(false) }}
            className={`${stylePrefix}-layout`}
            // className="ripple"
            onClick={() => handleClick(index)}
        >
            <div
                style={{
                    height: (display[index] ? 47 : 0),
                }}
                className={`${stylePrefix}-main`}
            >
                {display[index]
                    ? <IconFont type={item.icon} className={`${stylePrefix}-icon`} />
                    : ""
                }
                {display[index] ? item.title : ""}
            </div>
        </div>
    )
}