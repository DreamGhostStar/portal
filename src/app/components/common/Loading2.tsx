import React from 'react'
import '../../styles/comon/loading2.scss'

interface LoadingConfig {
    backgroundColor?: string
}
export default function Loading2({backgroundColor = '#fff'}: LoadingConfig) {
    return (
        <div 
        className="container"
        style={{
            backgroundColor: (backgroundColor)
        }}
        >
            <div className="item-1 item"></div>
            <div className="item-2 item"></div>
            <div className="item-3 item"></div>
            <div className="item-4 item"></div>
            <div className="item-5 item"></div>
        </div>
    )
}
