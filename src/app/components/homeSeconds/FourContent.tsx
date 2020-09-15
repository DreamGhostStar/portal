import React from 'react'
import TableShow from './TableShow'
import 'app/styles/homeSeconds/fourContent.scss'
const stylePrefix = 'home-fourContent'

export default function FourContent() {
    return (
        <div style={{
            height: 900,
            backgroundColor: '#eee'
        }} id='four'>
            <div className={`${stylePrefix}-main`}>
                <div className={`${stylePrefix}-title`}>英才聚集</div>
                <div className={`${stylePrefix}-decoration`}>那些年相遇的我们</div>
                <TableShow />
            </div>
        </div>
    )
}