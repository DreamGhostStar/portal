import React from 'react'
import 'app/styles/comon/menuIcon.scss'
import classnames from 'classnames'

const stylePrefix = 'common-menuIcon'

interface MenuIconProps {
    showMenu: boolean;
    setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
    color?: string;
}

export default function MenuIcon({ color = '#000', showMenu, setShowMenu }: MenuIconProps) {
    return (
        <div className={`${stylePrefix}-main`} onClick={() => setShowMenu(!showMenu)}>
            <div
                className={
                    classnames(`${stylePrefix}-line`, {
                        [`${stylePrefix}-rotate-right`]: showMenu
                    })
                }
                style={{
                    backgroundColor: color
                }}
            ></div>
            <div className={`${stylePrefix}-line`} style={{
                display: showMenu ? 'none' : 'block',
                backgroundColor: color
            }}></div>
            <div
                className={
                    classnames(`${stylePrefix}-line`, {
                        [`${stylePrefix}-rotate-left`]: showMenu
                    })
                }
                style={{
                    backgroundColor: color
                }}
            ></div>
        </div>
    )
}
