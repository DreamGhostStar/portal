import React from 'react'
import '../../styles/comon/bubble.scss'

export default function Bubble({ tip }: { tip: string }) {
    return (
        <div className="tag">
            {tip}
        </div>
    )
}
