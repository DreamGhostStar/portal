import React, { useEffect, useState } from 'react'
import '../../styles/comon/star.scss'

interface starDataConfig {
    item: any,
    screenWidth: number
}

export default function Star({item, screenWidth}: starDataConfig) {
    const [left, setLeft] = useState(0)
    useEffect(() => {
        const leftTemp = item.left / 1800 * screenWidth;
        setLeft(leftTemp)
    }, [])
    return (
        <div className="shine shine2" style={{
            left: left,
            top: (item.top),
            transform: [`scale(${item.scale})`].toString(),
            animationDuration: (item.duration)
        }}></div>
    )
}