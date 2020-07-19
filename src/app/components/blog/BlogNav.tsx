import React, { useState, useRef, useEffect } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import '../../styles/blog/blogHeader.scss'
import AvatorShowContainer from '../../../containers/AvatorShow_container';
import cookies from 'react-cookies'
import logo from 'images/TechF5veBlack.png'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
interface activeIndexConfig {
    activeIndex: number
}

export default function BlogNav({ activeIndex }: activeIndexConfig) {
    const [displayActive, setDisplayActive] = useState(new Array(3).fill(false).fill(true, activeIndex, activeIndex + 1))
    const [isFocus, setIsFoucus] = useState(false)
    const [isMouse, setIsMouse] = useState(false)
    const [user, setUser] = useState(null)
    const lineRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        store.subscribe(() => { // 监听redux变化
            setUser(store.getState().user)
        })
    }, [])

    const addActive = (index: number) => {
        let tempDisplayActive = new Array(3).fill(false);
        tempDisplayActive[index] = true;
        (lineRef.current as any).style.left = index * 88 + 'px';

        setDisplayActive(tempDisplayActive)
    }

    const removeActive = () => {
        (lineRef.current as any).style.left = activeIndex * 80 + 'px';
        setDisplayActive(new Array(3).fill(false).fill(true, activeIndex, activeIndex + 1))
    }

    // 处理搜索框中数据
    // TODO: 向后端请求相关文章
    const handleClick = () => {
        console.log((inputRef.current as any).value);
    }

    // 处理搜索图标的bug
    const handleMouseDown = (event: any) => {
        event.preventDefault()
    }

    const handleIsLogin = () => {
        if (cookies.load('Authorization')) {
            return (
                <Provider store={store}>
                    <AvatorShowContainer top={1} labelTop={60} />
                </Provider>
            )
        }
        else {
            return (
                <Link to="/login" className="blogButton">
                    登录 / 注册
                </Link>
            )
        }
    }
    return (
        <header className='blogNav'>
            <nav style={{ margin: "0 auto" }}>
                <div className="logo" style={{
                    float: "left",
                }}>
                    <img src={logo} height={60} alt="logo" />
                </div>
                <div className="nav" style={{ float: "left", marginLeft: 50 }}>
                    <Link
                        to={{
                            pathname: `/home`
                        }}
                        className="blogNavItem"
                        onMouseOver={() => addActive(0)}
                        onMouseOut={() => removeActive()}
                    >
                        首页
                    </Link>
                    <Link
                        to={{
                            pathname: `/blog/undefined`
                        }}
                        style={{
                            textDecoration: 'none',
                            color: (displayActive[1] ? '#f00' : '#000')
                        }}
                        className="blogNavItem"
                        onMouseOver={() => addActive(1)}
                        onMouseOut={() => removeActive()}
                    >
                        博客
                    </Link>
                    <Link
                        to={{
                            pathname: `/my/info`
                        }}
                        style={{
                            textDecoration: 'none',
                            color: (displayActive[2] ? '#f00' : '#000')
                        }}
                        className="blogNavItem"
                        onMouseOver={() => addActive(2)}
                        onMouseOut={() => removeActive()}
                    >
                        消息
                    </Link>
                    <div
                        ref={lineRef}
                        className='blogRedLine'
                        style={{
                            left: (activeIndex * 80),
                        }}
                    ></div>
                </div>
                {
                    handleIsLogin()
                }
                <input
                    id="name"
                    type="text"
                    placeholder={isFocus ? '请输入要搜索的博客' : ''}
                    autoComplete='off'
                    style={{
                        backgroundColor: (isFocus ? '#eee' : '#ddd'),
                        right: (isFocus ? -58 : 0)
                    }}
                    className='blogInputSearch'
                    onFocus={() => { setIsFoucus(true) }}
                    onBlur={() => { setIsFoucus(false) }}
                    ref={inputRef}
                />
                <SearchOutlined
                    style={{
                        transform: (isFocus ? 'translateX(28px)' : 'translateX(-30px)'),
                    }}
                    className='blogSearchIcon'
                    onClick={handleClick}
                    onMouseDown={(event: any) => handleMouseDown(event)}
                />
                <label className='blogSearchLabel'>文章</label>
            </nav>
        </header>
    )
}
