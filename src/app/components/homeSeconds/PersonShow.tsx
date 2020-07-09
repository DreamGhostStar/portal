import React, { useState } from 'react'
import avatorURL from '../../../images/profile photo.jpg'
import PersonDetailShow from '../common/PersonDetailShow';

export default function PersonShow({ item }: { item: any }) {
    const [showDetail, setShowDetail] = useState(false)

    const handleClick = () => {
        setShowDetail(true)
    }

    const cancelShowDetail = () => {
        setShowDetail(false)
    }
    return (
        <>
            <div style={{
                width: 200,
                height: 100,
                borderRadius: 10,
                backgroundColor: '#eee',
                marginRight: 25,
                marginLeft: 25,
                marginTop: 25,
                cursor: 'pointer'
            }} onClick={handleClick}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-around'
                }}>
                    <img src={avatorURL} alt="头像" style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        marginTop: 10
                    }} />
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            fontWeight: 'bold',
                            fontSize: 16
                        }}>
                            {item.realName}
                        </div>
                        <div style={{
                            color: '#bbb',
                            marginTop: 5
                        }}>
                            {item.motto}
                        </div>
                    </div>
                </div>
            </div>
            <div style={{
                backgroundColor: '#000',
                opacity: (showDetail ? 0.1 : 0),
                display: (showDetail ? 'block' : 'none'),
                width: '100vw',
                height: '100vh',
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: 199
            }}></div>
            <div style={{
                display: (showDetail ? 'block' : 'none')
            }}>
                <PersonDetailShow item={item} cancelShowDetail={cancelShowDetail} />
            </div>
        </>
    )
}