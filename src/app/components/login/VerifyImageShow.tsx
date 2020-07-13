import React, { useState, useEffect } from 'react'
import { _verificationCode } from '../common/Api';
import { IconFont } from '../common/config';
import 'app/styles/login/verifyImageShow.scss'
const stylePrefix = 'login-verifyImg'

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
            className={`${stylePrefix}-layout`}
            onMouseOver={() => { setIsMouse(true) }}
            onMouseOut={() => { setIsMouse(false) }}
            onClick={handleClick}
        >
            <img src={verifyImage} alt="验证码" className={`${stylePrefix}-img`} />
            <div
                style={{
                    opacity: (isMouse ? 0.7 : 0),
                }}
                className={`${stylePrefix}-shadow`}
            ></div>
            <IconFont
                type='anticonjiazai'
                style={{
                    animationName: (loading ? 'rotateIcon' : 'none'),
                    // transform: (loading ? 'rotate(180deg)' : 'rotate(0deg)'),
                    opacity: (isMouse ? 1 : 0),
                }}
                className={`${stylePrefix}-icon`}
            />
        </div>
    )
}
