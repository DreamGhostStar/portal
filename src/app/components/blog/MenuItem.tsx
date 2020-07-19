import React, { useState } from 'react'
import '../../styles/blog/blogSider.scss'
import { useHistory } from 'react-router-dom'
import { IconFont } from '../common/config';

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
                width: 260,
                height: (display[index] ? 47 : 0),
                backgroundColor: (isMouse || (clickIndex === index) ? '#0099FF' : '#66CCFF'),
                textAlign: "center",
                lineHeight: '47px',
                color: '#fff',
                borderBottom: (display[index] ? '1px solid #6699FF' : 'none'),
                transitionDuration: '.5s',
                cursor: 'pointer'
            }}
            onMouseOver={() => { setIsMouse(true) }}
            onMouseOut={() => { setIsMouse(false) }}
            className="ripple"
            onClick={() => handleClick(index)}
        >
            <div style={{
                color: '#fff',
                float: "left",
                marginLeft: 22,
                width: 237,
                textAlign: 'left',
                height: (display[index] ? 47 : 0),
            }}>
                {display[index]
                    ? <IconFont type={item.icon} style={{
                        fontSize: 20,
                        marginRight: 19
                    }} />
                    : ""
                }
                {display[index] ? item.title : ""}
            </div>
        </div>
    )
}