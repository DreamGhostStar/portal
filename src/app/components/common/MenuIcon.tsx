import React, { useState } from 'react'
import 'app/styles/comon/menuIcon.scss'

const stylePrefix = 'common-menuIcon'

export default function MenuIcon() {
    const [showMenu, setShowMenu] = useState(false)
    return (
        <div className={`${stylePrefix}-main`} onClick={() => setShowMenu(!showMenu)}>
            <div className={showMenu ? `${stylePrefix}-line ${stylePrefix}-rotate-right` : `${stylePrefix}-line`}></div>
            <div className={`${stylePrefix}-line`} style={{
                display: showMenu ? 'none' : 'block'
            }}></div>
            <div className={showMenu ? `${stylePrefix}-line ${stylePrefix}-rotate-left` : `${stylePrefix}-line`}></div>
        </div>
    )
}
