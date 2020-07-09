import React, { useState } from 'react'
import { IconFont } from '../common/config';

export default function RelationCard({ data }: { data: any }) {
    const [mouseIndex, setMouseIndex] = useState(null)
    return (
        <div style={{
            width: 350,
            height: (data.id === 1 ? 260 : 220),
            backgroundColor: '#fff',
            position: 'relative',
            transitionDuration: '.8s',
            top: (mouseIndex === data.id ? -30 : 0)
        }}
            onMouseOver={() => { setMouseIndex(data.id) }}
            onMouseOut={() => { setMouseIndex(null) }}
        >
            <div style={{
                left: '50%',
                marginLeft: -10,
                position: 'relative',
                width: 20
            }}>
                <IconFont type={data.iconURL} style={{
                    fontSize: 20,
                    paddingTop: 30,
                    paddingBottom: 20
                }} />
            </div>
            <div style={{
                textAlign: 'center',
                fontWeight: 'bold',
                paddingBottom: 30
            }}>{data.title}</div>
            <div style={{
                position: 'relative',
                left: '50%',
                marginLeft: -20,
                width: 40,
                height: 5,
                backgroundColor: '#000',
                marginBottom: 30
            }}></div>
            {
                data.id === 1
                    ? <div style={{
                        paddingBottom: 40,
                        color: '#8c9398',
                        fontWeight: 700,
                        fontSize: 15
                    }}>
                        <div style={{
                            textAlign: 'center'
                        }}>{data.decoration}</div>
                        <div style={{
                            textAlign: 'center'
                        }}>{data.decoration1}</div>
                        <div style={{
                            textAlign: 'center'
                        }}>{data.decoration2}</div>
                    </div>
                    : <div style={{
                        paddingBottom: 40,
                        color: '#8c9398',
                        fontWeight: 700,
                        fontSize: 15
                    }}>
                        <div style={{
                            textAlign: 'center'
                        }}>{data.decoration}</div>
                    </div>
            }
            <div style={{
                width: 350,
                height: 5,
                backgroundColor: (mouseIndex === data.id ? '#000' : '#fff'),
                opacity: (mouseIndex === data.id ? 1 : 0),
                transitionDuration: '.8s'
            }}></div>
        </div>
    )
}