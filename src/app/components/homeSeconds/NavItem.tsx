import React from 'react'
import '../../styles/homeSeconds/navItem.scss'
import { HashRouter as Router, Link } from 'react-router-dom'

interface navItemDataConfig {
    activeIndex: number, 
    textColor: string, 
    scrollIndex: number, 
    item: any, 
    index: number, 
    addActive: any, 
    removeActive: any, 
    handleAnchor: any
}

export default function NavItem({ activeIndex, textColor, scrollIndex, item, index, addActive, removeActive, handleAnchor }: navItemDataConfig) {
    return (
        <Link
            to="#"
            style={{
                color: (activeIndex === index ? '#f00' : textColor)
            }}
            className='navItem'
            onMouseOver={() => addActive(index)}
            onMouseOut={() => removeActive(scrollIndex)}
            onClick={() => handleAnchor(item.anchor)}
        >
            {item.content}
        </Link>
    )
}
