import React, { useState } from 'react'
interface CrossPieceConfig {
    handleCrossClick: any, 
    id: number, 
    item: any, 
    clickCrossID: number
}

export default function CrossPiece({clickCrossID, id, handleCrossClick, item}: CrossPieceConfig) {
    const [isMouse, setIsMouse] = useState(false)
    return (
        <div
            style={{
                backgroundColor: '#00FFFF',
                opacity: (isMouse || clickCrossID === id ? 1 : 0.5),
                width: 148,
                borderRight: '2px solid #ccc',
                textAlign: 'center',
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                height: 50,
                lineHeight: '50px',
                fontSize: 20,
                cursor: 'pointer'
            }}
            onMouseOver={() => { setIsMouse(true) }}
            onMouseOut={() => { setIsMouse(false) }}
            onClick={() => { handleCrossClick(id) }}
        >
            {item.content}
        </div>
    )
}