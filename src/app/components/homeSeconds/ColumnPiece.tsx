import React, { useState } from 'react'
import 'app/styles/homeSeconds/columnPiece.scss'
interface ColumnPieceDataConfig {
    handleColumnClick: any, 
    id: number, 
    item: any, 
    clickColumnID: number
}

export default function ColumnPiece({ handleColumnClick, id, item, clickColumnID }: ColumnPieceDataConfig) {
    const [isMouse, setIsMouse] = useState(false)

    return (
        <div
            style={{
                opacity: (isMouse || clickColumnID === id ? 1 : 0.5),
            }}
            className='home-columnPiece-main'
            onMouseOver={() => { setIsMouse(true) }}
            onMouseOut={() => { setIsMouse(false) }}
            onClick={() => { handleColumnClick(id) }}
        >
            {item.content}
        </div>
    )
}