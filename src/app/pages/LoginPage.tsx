import React, { useState, useEffect } from 'react'
import RegisterContainer from '../../containers/Register_container'
import Enroll from '../components/login/Enroll'
import loginBackGround from '../../images/loginPage.jpg'
import '../styles/page/loginPage.scss'
import cookies from 'react-cookies'

import store from '../../redux/store'
import { Provider } from 'react-redux'
import { isMobile } from 'app/components/common/utils'
import TECHF5VE from 'images/TechF5ve.png'
import LoginMobileContainer from 'containers/LoginMobile_container'

const stylePrefix = 'page-login-mobile'

export default function LoginPage() {
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    const [reversalIndex, setReversalIndex] = useState(0) // 0代表登录界面，1代表注册界面

    const monitor = (e: any) => {
        // 事件监听，如果屏幕大小改变，立即改变screenHeight，并且触发媒体查询
        const screenHeight = e.target.innerHeight;
        setScreenHeight(screenHeight)
    }

    useEffect(() => {
        // 事件监听，如果屏幕大小改变，立即改变screenHeight，并且触发媒体查询
        window.addEventListener('resize', monitor);
        cookies.remove('Authorization'); // 清除状态，以便游客浏览
        return () => {
            window.removeEventListener('resize', monitor);
        }
    }, [])
    return (
        <>
            {
                isMobile()
                    ? <div className={`${stylePrefix}-layout`}>
                        <header className={`${stylePrefix}-header`}>
                            <img src={TECHF5VE} alt="logo" className={`${stylePrefix}-logo`} />
                            <div className={`${stylePrefix}-title`}>{reversalIndex === 0 ? '登录' : '注册'}</div>
                        </header>
                        <Provider store={store}>
                            <LoginMobileContainer
                                isLogin={reversalIndex === 0}
                                setReversalIndex={setReversalIndex}
                            />
                        </Provider>
                    </div>
                    : <div style={{
                        height: screenHeight,
                        background: "url(" + loginBackGround + ") no-repeat center center fixed",
                        backgroundSize: 'cover'
                    }}>
                        <div
                            className={reversalIndex === 0 ? "element" : 'element middle-flip'}
                        >
                            <div style={{
                                color: '#fff',
                                textAlign: 'center',
                                fontSize: 34,
                                marginBottom: 20,
                                width: 400
                            }}>
                                TECH F5VE
                            </div>
                            <div className='front'>
                                <Provider store={store}>
                                    <RegisterContainer enterEnroll={() => setReversalIndex(1)} />
                                </Provider>
                            </div>
                            <div className='back'>
                                <Enroll enterRegister={() => setReversalIndex(0)} />
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}
