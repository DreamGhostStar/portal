import React, { useState, useRef, useEffect } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import '../../styles/blog/blogHeader.scss'
import AvatorShowContainer from '../../../containers/AvatorShow_container';
import logo from 'images/TechF5veBlack.png'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import { _getUserDetail } from '../common/Api';

import userInfo from 'model/userInfo.json' // TODO: 假数据，需删除
interface BlogNavConfig {
    activeIndex: number,
    transform_user: any
}
interface userConfig {
    id: number,
    username: string,
    avatar: string,
    motto: string,
    nickname: string,
    email: string,
    year: string,
    role: number,
    permissions: string[],
    token: string
}

export default function BlogNav({activeIndex, transform_user}: BlogNavConfig) {
    const [displayActive, setDisplayActive] = useState(new Array(3).fill(false).fill(true, activeIndex, activeIndex + 1))
    const [isFocus, setIsFoucus] = useState(false)
    const [user, setUser] = useState<null | userConfig>(store.getState().user)
    const lineRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        getUser();
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
        if (user) {
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
    const getUser = async () => {
        transform_user(userInfo)
        setUser(userInfo)
        // TODO: 与后端对接
        // const res = await _getUserDetail();

        // if (res) {
        //     if (res.data.code === 0) {
        //         props.transform_user(res.data.data)
        //     }
        // }
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
