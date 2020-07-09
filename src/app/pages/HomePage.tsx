import React, { useState, useEffect } from 'react'
import HeaderContainer from '../../containers/Header_container'
import { BackTop } from 'antd';
import FirstContent from '../components/homeSeconds/FirstContent';
import SecondContent from '../components/homeSeconds/SecondContent';
import ThreeContent from '../components/homeSeconds/ThreeContent';
import Star from '../components/common/Star'
import FourContent from '../components/homeSeconds/FourContent';
import FiveContent from '../components/homeSeconds/FiveContent';
import Footer from '../components/homeSeconds/Footer';
import { useHistory } from 'react-router-dom'
import '../styles/page/homePage.scss'

import store from '../../redux/store'
import { Provider } from 'react-redux'
import { getUser } from '../components/common/config';

// 星星位置
const pos = [
    {
        top: 20,
        left: 20,
        scale: 0.5,
        duration: '2s'
    },
    {
        top: 370,
        left: 1200,
        scale: 0.3,
        duration: '2.7s'
    },
    {
        top: 200,
        left: 400,
        scale: 0.4,
        duration: '3s'
    },
    {
        top: 80,
        left: 1500,
        scale: 0.6,
        duration: '2.3s'
    },
    {
        top: 70,
        left: 300,
        scale: 0.3,
        duration: '4s'
    },
]


export default function HomePage(props: any) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [screenHeight, setScreenHeight] = useState(window.innerHeight)
    const [isFixed, setIsFixed] = useState(false)
    const [scrollIndex, setScrollIndex] = useState(0)
    let history = useHistory();

    const updateWindowStyle = (e: any) => {
        const screenWidthTemp = e.target.innerWidth;
        const screenHeightTemp = e.target.innerHeight;
        setScreenWidth(screenWidthTemp)
        setScreenHeight(screenHeightTemp)
    }
    const updateHeaderPos = (e: any) => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 60) {
            switch (scrollIndex) {
                case 0:
                    if (scrollTop > 900) {
                        setScrollIndex(1)
                    }
                    break;
                case 1:
                    if (scrollTop > 1800) {
                        setScrollIndex(2)
                    } else if (scrollTop < 900) {
                        setScrollIndex(0)
                    }
                    break;
                case 2:
                    if (scrollTop > 2700) {
                        setScrollIndex(3)
                    } else if (scrollTop < 1800) {
                        setScrollIndex(1)
                    }
                    break;
                case 3:
                    if (scrollTop > 3000) {
                        setScrollIndex(4)
                    } else if (scrollTop < 2700) {
                        setScrollIndex(2)
                    }
                    break;
                case 4:
                    if (scrollTop < 3000) {
                        setScrollIndex(3)
                    }
                    break;
                default:

            }

            if (!isFixed) {
                setIsFixed(true)
            }
        } else {
            if (isFixed) {
                setIsFixed(false)
            }
        }
    }
    useEffect(() => {
        getUser(props.transform_user, history, false);
        window.addEventListener('resize', updateWindowStyle);
        window.addEventListener('scroll', updateHeaderPos);
        return () => {
            window.removeEventListener('resize', updateWindowStyle)
            window.removeEventListener('scroll', updateHeaderPos)
        }
    }, [])
    return (
        <>
            <BackTop visibilityHeight={900} />
            <Provider store={store}>
                <HeaderContainer
                    isFixed={isFixed}
                    scrollIndex={scrollIndex}
                    handleHeaderArchor={(index: number) => { setScrollIndex(index) }}
                />
            </Provider>
            <div className='homePage_firstContent' id='first'>
                <FirstContent />
                {
                    // 遍历生成星星
                    pos.map((item, index) => {
                        return <Star item={item} key={index} screenWidth={screenWidth} />
                    })
                }
            </div>
            <div style={{
                height: 900,
                width: '100%',
                paddingTop: 50,
                paddingBottom: 50,
                backgroundColor: '#2a4190'
            }} id='second'>
                <SecondContent scrollIndex={scrollIndex} />
            </div>
            <div style={{
                height: 900
            }} id='three'>
                <ThreeContent />
            </div>
            <div style={{
                height: 900,
                backgroundColor: '#eee'
            }} id='four'>
                <FourContent />
            </div>
            <div style={{
                height: 600,
                backgroundColor: '#f0f2f4'
            }} id='five'>
                <FiveContent />
            </div>
            <div style={{
                height: 150,
                backgroundColor: '#000'
            }}>
                <Footer />
            </div>
        </>
    )
}