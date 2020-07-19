import React from 'react'

interface DriverConfig {
    backgroundColor?: string,
    height?: number,
    width?: number
}

export default function Driver({ backgroundColor, height, width }: DriverConfig) {
    return (
        <div style={{
            backgroundColor: (backgroundColor || '#eee'),
            height: (height || 'auto'),
            marginRight: 20,
            marginLeft: 20,
            width: (width || 'auto')
        }}>

        </div>
    )
}