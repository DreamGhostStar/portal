import React, { useState, useEffect } from 'react'
import { _verificationCode } from '../common/Api';
import { IconFont } from '../common/config';

export default function VerifyImageShow() {
    const [verifyImage, setVerifyImage] = useState('')
    const [isMouse, setIsMouse] = useState(false)
    const [loading, setLoading] = useState(false)

    // 获取验证码接口
    const getVerificationCode = async () => {
        const res = await _verificationCode();

        if (res) {
            if (res.data.code === 0) {
                setVerifyImage(res.data.data)
                setLoading(false)
            }
        }
    }
    const handleClick = () => {
        setLoading(true)
        getVerificationCode()
    }

    useEffect(() => {
        getVerificationCode();
    }, [])
    
    return (
        <div
            style={{
                position: 'relative',
                width: 150,
                height: 50,
                cursor: 'pointer'
            }}
            onMouseOver={()=>{setIsMouse(true)}}
            onMouseOut={()=>{setIsMouse(false)}}
            onClick={handleClick}
        >
            <img src={verifyImage} alt="验证码" style={{
                width: 150,
                height: 50,
                position: 'absolute',
                left: 0,
                zIndex: 3
            }} />
            <div style={{
                position: 'absolute',
                width: 150,
                height: 50,
                left: 0,
                backgroundColor: '#fff',
                opacity: (isMouse ? 0.7 : 0),
                zIndex: 4
            }}></div>
            <IconFont type='anticonjiazai' style={{
                position: 'absolute',
                zIndex: 6,
                fontSize: 40,
                color: '#fff',
                transitionDuration: '.5s',
                transform: (loading ? 'rotate(180deg)' : 'rotate(0deg)'),
                opacity: (isMouse ? 1 : 0),
                margin: '5px 55px'
            }}/>
        </div>
    )
}
