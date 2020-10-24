import React, { useContext, useState } from 'react'
import '../../styles/blog/menuItem.scss'
import { useHistory } from 'react-router-dom'
import { IconFont } from '../common/config';
import { SiderContext } from 'app/pages/BlogPage';

const stylePrefix = 'blog-menuItem'

interface MenuItemConfig {
    display: any[],
    index: number,
    item: any,
    transfrom_type: any
}

export default function MenuItem({ display, index, item, transfrom_type }: MenuItemConfig, props: any) {
    const context = useContext(SiderContext)
    let history = useHistory();
    const [isMouse, setIsMouse] = useState(false)
    const handleClick = (index: number) => {
        // 传递给父组件
        if(context.onClick) {
            context.onClick(index)
        }
        // 传递store
        transfrom_type(index);
        if (window.location.hash !== '#/blog/undefined') {
            history.push(`/blog/undefined`);
        }
    }
    return (
        <div
            style={{
                height: (display[index] ? 47 : 0),
                backgroundColor: (isMouse || (context.index === index) ? '#0099FF' : '#66CCFF'),
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