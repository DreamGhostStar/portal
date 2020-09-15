import React, { useState, useEffect } from 'react'
import HeaderContainer from '../../containers/Header_container'
import { BackTop } from 'antd';
import FirstContent from '../components/homeSeconds/FirstContent';
import SecondContent from '../components/homeSeconds/SecondContent';
import ThreeContent from '../components/homeSeconds/ThreeContent';
import FourContent from '../components/homeSeconds/FourContent';
import FiveContent from '../components/homeSeconds/FiveContent';
import Footer from '../components/homeSeconds/Footer';
import { useHistory } from 'react-router-dom'
import '../styles/page/homePage.scss'

import store from '../../redux/store'
import { Provider } from 'react-redux'
import { getUser } from '../components/common/config';
import { setRemUnit } from 'app/components/common/utils';

export default function HomePage(props: any) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [isFixed, setIsFixed] = useState(false)
    const [scrollIndex, setScrollIndex] = useState(0)
    let history = useHistory();

    const updateWindowStyle = (e: any) => {
        const screenWidthTemp = e.target.innerWidth;
        setScreenWidth(screenWidthTemp)
        setRemUnit();
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
        setRemUnit();
    }, [])
    useEffect(() => {
        window.addEventListener('resize', updateWindowStyle);
        window.addEventListener('scroll', updateHeaderPos);
        return () => {
            window.removeEventListener('resize', updateWindowStyle)
            window.removeEventListener('scroll', updateHeaderPos)
        }
    }, [scrollIndex])
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
            <FirstContent />
            <SecondContent scrollIndex={scrollIndex} />
            <ThreeContent />
            <FourContent />
            <FiveContent />
            <Footer />
        </>
    )
}