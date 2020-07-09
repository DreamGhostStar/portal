import React from 'react'
import TableShow from './TableShow'

export default function FourContent() {
    return (
        <div style={{
            height: 600,
            width: 1200,
            margin: '0 auto'
        }}>
            <div style={{
                textAlign: 'center',
                fontSize: 40,
                marginBottom: 30,
                paddingTop: 30
            }}>英才聚集</div>
            <div style={{
                textAlign: 'center',
                fontSize: 20,
                color: '#bbb',
                paddingBottom: 20
            }}>那些年相遇的我们</div>
            <TableShow />
        </div>
    )
}