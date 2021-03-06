import React, { useState, useEffect } from 'react'
import HeaderContainer from '../../containers/Header_container'
import { BackTop } from 'antd';
import FirstContent from '../components/homeSeconds/FirstContent';
import Service from '../components/homeSeconds/Service';
import Production from '../components/homeSeconds/Production';
import Friend from '../components/homeSeconds/Friend';
import Contact from '../components/homeSeconds/Contact';
import Footer from '../components/homeSeconds/Footer';
import { useHistory } from 'react-router-dom'
import '../styles/page/homePage.scss'

import store from '../../redux/store'
import { Provider } from 'react-redux'
import { getUser } from '../components/common/config';
import { setRemUnit } from 'app/components/common/utils';
import Seeker from 'app/components/homeSeconds/Seeker';

export default function HomePage(props: any) {
    const [isFixed, setIsFixed] = useState(false)
    const [scrollIndex, setScrollIndex] = useState(0)
    let history = useHistory();

    const updateWindowStyle = (e: any) => {
        setRemUnit();
    }
    const updateHeaderPos = (e: any) => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 60) {
            switch (scrollIndex) {
                case 0:
                    if (scrollTop > 400) {
                        setScrollIndex(1)
                    }
                    break;
                case 1:
                    if (scrollTop > 800) {
                        setScrollIndex(2)
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
                    // isFixed={isFixed}
                    // scrollIndex={scrollIndex}
                    // handleHeaderArchor={(index: number) => setScrollIndex(index)}
                />
            </Provider>
            <FirstContent />
            <Service scrollIndex={scrollIndex} />
            <Seeker scrollIndex={scrollIndex} />
            <Production />
            <Friend />
            <Contact />
            <Footer />
        </>
    )
}