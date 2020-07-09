import React, { useState } from 'react'
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
                backgroundColor: '#00FFFF',
                opacity: (isMouse || clickColumnID === id ? 1 : 0.5),
                width: 150,
                textAlign: 'center',
                height: 49,
                borderBottom: '1px solid #ccc',
                lineHeight: '50px',
                fontSize: 20,
                cursor: 'pointer'
            }}
            onMouseOver={() => { setIsMouse(true) }}
            onMouseOut={() => { setIsMouse(false) }}
            onClick={() => { handleColumnClick(id) }}
        >
            {item.content}
        </div>
    )
}