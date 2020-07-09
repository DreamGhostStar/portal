import React, { useState } from 'react'
import avatorURL from '../../../images/profile photo.jpg'
import { IconFont } from './config';
interface personDetailShowDataConfig {
    cancelShowDetail: any,
    item: any
}

export default function PersonDetailShow({ cancelShowDetail, item }: personDetailShowDataConfig) {
    const [isMouse, setIsMouse] = useState(false)
    return (
        <div style={{
            width: 300,
            height: 600,
            position: 'fixed',
            top: '60%',
            marginTop: -300,
            left: '50%',
            marginLeft: -150,
            zIndex: 200
        }}>
            <div style={{
                backgroundColor: '#fff',
                width: 300,
                height: 450,
                borderRadius: 20,
                position: 'relative'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    cursor: 'pointer',
                    backgroundColor: (isMouse ? '#f00' : 'transparent')
                }}
                    onMouseOver={() => { setIsMouse(true) }}
                    onMouseOut={() => { setIsMouse(false) }}
                >
                    <IconFont type="anticoncha" style={{
                        fontSize: 20
                    }} onClick={cancelShowDetail} />
                </div>
                <img src={avatorURL} alt="头像" style={{
                    width: 200,
                    height: 200,
                    borderRadius: '50%',
                    marginLeft: 50,
                    border: '2px solid #f00',
                    position: 'absolute',
                    top: -100
                }} />
                <div style={{
                    paddingTop: 110,
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: 40
                }}>{item.realName}</div>
                <div style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#ccc'
                }}>
                    <span>类别：</span>
                    {item.type}
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: 20,
                    color: '#ccc'
                }}>
                    <span>年份：</span>
                    {item.year}
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: 18,
                    paddingTop: 50
                }}>
                    {item.motto}
                </div>
            </div>
        </div>
    )
}