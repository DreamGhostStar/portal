import React, { useState, useRef, useEffect, useContext } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import '../../styles/blog/blogHeader.scss'
import logo from 'images/logo/TechF5veBlack.png'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import { SearchOutlined } from '@ant-design/icons';
import { _getUserDetail } from '../common/Api';
import { useHistory } from 'react-router-dom'
import staticBlogHeader from 'static/blogHeader.json'

import userInfo from 'model/userInfo.json' // TODO: 假数据，需删除
import { info, IconFont } from '../common/config';
import { getToken, isMobile } from '../common/utils';

import searchArticle from 'model/searchArticle.json'
import AuthorShow_container from 'containers/AuthorShow_container';
import articleMenuData from 'static/articleKindList.json'
import myMenuData from 'static/myInfoSider.json'
import classnames from 'classnames'
import MenuIcon from '../common/MenuIcon'
import { SiderContext } from 'app/pages/BlogPage'
import { MySiderContext } from 'app/pages/MyInfoPage'
const stylePrefix = 'blog-header';
interface BlogNavConfig {
    activeIndex: number | null
    transform_user: any
}

interface searchArticleItemConfig {
    articleID: number
    title: string
    content?: string
}

export interface menuItemConfig {
    title: string;
    icon: string;
}
const menuMap = {
    0: articleMenuData,
    1: myMenuData,
    2: []
}

export default function BlogNav({ activeIndex, transform_user }: BlogNavConfig) {
    let history = useHistory()
    const articleContext = useContext(SiderContext)
    const myContext = useContext(MySiderContext)
    const [displayActive, setDisplayActive] = useState<null | number>(activeIndex) // 显示博客、消息和问卷索引
    const [isFocus, setIsFoucus] = useState(false)
    const [searchList, setSearchList] = useState<searchArticleItemConfig[]>([])
    const [showMenu, setShowMenu] = useState(false)
    const [menuData, setMenuData] = useState<menuItemConfig[]>([])
    const [userInfoShow, setUserInfoShow] = useState(
        <Link to="/login" className="blogButton">
            登录 / 注册
        </Link>
    )
    const lineRef = useRef(null)
    const inputRef = useRef(null)

    useEffect(() => {
        getUser();
        userDataLister()
        // 监听state状态改变
        store.subscribe(() => {
            userDataLister()
        })
    }, [])

    useEffect(() => {
        if (displayActive !== null) {
            setMenuData(menuMap[displayActive])
        }
    }, [displayActive])

    const userDataLister = () => {
        if (store.getState().user) {
            setUserInfoShow(
                <Provider store={store}>
                    <AuthorShow_container top={isMobile() ? 10 : 1} labelTop={60} isHome={false} />
                </Provider>
            )
        }
        else {
            setUserInfoShow(
                <Link to="/login" className="blogButton">
                    登录 / 注册
                </Link>
            )
        }
    }

    const addActive = (index: number) => {
        (lineRef.current as any).style.left = index * 80 + 'px';
        setDisplayActive(index)
    }

    const removeActive = () => {
        (lineRef.current as any).style.left = activeIndex ? activeIndex * 80 + 'px' : '0px';
        setDisplayActive(activeIndex)
    }

    // 处理搜索框中数据
    // TODO: 向后端请求相关文章
    const handleClick = () => {
        if (!(inputRef.current as any).value) {
            info('输入不能为空')
            return
        }
        setSearchList(searchArticle)
    }

    // 处理搜索图标的bug
    const handleMouseDown = (event: any) => {
        event.preventDefault()
    }
    const showArticle = (articleID: number) => {
        console.log(articleID)
        history.push(`/blog/${articleID}`)
    }
    const getUser = async () => {
        if (getToken()) {
            transform_user(userInfo)
            // setUser(userInfo)
        }
        // TODO: 与后端对接
        // const res = await _getUserDetail();

        // if (res) {
        //     if (res.data.code === 0) {
        //         props.transform_user(res.data.data)
        //     }
        // }
    }
    const handleDisplayActive = (isAdd: boolean) => {
        if (displayActive !== null) {
            if (isAdd && displayActive !== 2) {
                history.push(staticBlogHeader[displayActive + 1].path)
            } else if (!isAdd && displayActive !== 0) {
                history.push(staticBlogHeader[displayActive - 1].path)
            }
        }
    }
    const handleMenuClick = (index: number) => {
        if (displayActive === 0) {
            if (articleContext.onClick) {
                articleContext.onClick(index)
            }
        } else if (displayActive === 1) {
            if (myContext.onClick) {
                myContext.onClick(index)
            }
        }
    }
    return (
        <header className='blogNav'>
            <nav className={`${stylePrefix}-nav`}>
                <div className={`${stylePrefix}-logo-layout`}>
                    {
                        isMobile()
                            ? <>
                                <MenuIcon showMenu={showMenu} setShowMenu={setShowMenu} />
                                <div className={
                                    classnames(`${stylePrefix}-menu-layout`, {
                                        [`${stylePrefix}-menu-layout-hidden`]: !showMenu
                                    })
                                } >
                                    {
                                        menuData.map((menu, index) => {
                                            return <div
                                                key={index}
                                                className={
                                                    classnames(`${stylePrefix}-menu-item`, {
                                                        [`${stylePrefix}-menu-item-active`]:
                                                            displayActive === 0
                                                                ? articleContext.index === index
                                                                : myContext.index === index
                                                    })
                                                }
                                                onClick={() => handleMenuClick(index)}
                                            >
                                                <IconFont
                                                    type={menu.icon}
                                                    className={`${stylePrefix}-menu-icon`}
                                                />
                                                <p
                                                    className={`${stylePrefix}-menu-title`}
                                                >
                                                    {menu.title}
                                                </p>
                                            </div>
                                        })
                                    }
                                </div>
                            </>
                            : <img
                                src={logo}
                                height={60}
                                onClick={() => history.push('/home')}
                                alt="logo"
                            />
                    }
                </div>
                {
                    !isMobile() && <div style={{ marginLeft: 50, width: 310 }}>
                        {
                            staticBlogHeader.map((headerData, index) => {
                                return <Link
                                    key={index}
                                    to={{
                                        pathname: headerData.path
                                    }}
                                    className="blogNavItem"
                                    style={{
                                        color: (displayActive === index ? '#f00' : '#000')
                                    }}
                                    onMouseOver={() => addActive(index)}
                                    onMouseOut={() => removeActive()}
                                >
                                    {headerData.value}
                                </Link>
                            })
                        }
                        <div
                            ref={lineRef}
                            className='blogRedLine'
                            style={{
                                display: (displayActive === null ? 'none' : 'block'),
                                left: (displayActive !== null ? displayActive * 80 : 0),
                            }}
                        ></div>
                    </div>
                }
                {
                    !isMobile() && <div>
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
                        <div className={`${stylePrefix}-show-search`}>
                            {
                                searchList.length > 0
                                && isFocus
                                && searchList.map((item, index) => {
                                    return <div
                                        className={`${stylePrefix}-search-item`}
                                        key={index}
                                        onMouseDown={(e) => { e.preventDefault() }} // 使得点击后不触发input的失去焦点事件
                                        onClick={() => { showArticle(item.articleID) }}
                                    >
                                        {item.title}
                                    </div>
                                })
                            }
                        </div>
                    </div>
                }
            </nav>
            {
                isMobile() && <div
                    className={`${stylePrefix}-title-layout`}
                >
                    <IconFont
                        className={
                            classnames(`${stylePrefix}-arrow`, {
                                [`${stylePrefix}-arrow-hidden`]: !displayActive
                            })
                        }
                        type='anticonqianjin-copy'
                        onClick={() => handleDisplayActive(false)}
                    />
                    <h3 className={`${stylePrefix}-title`} >{displayActive ? staticBlogHeader[displayActive].value : '博客'}</h3>
                    <IconFont
                        className={
                            classnames(`${stylePrefix}-arrow`, {
                                [`${stylePrefix}-arrow-hidden`]: displayActive === 2
                            })
                        }
                        type='anticonqianjin'
                        onClick={() => handleDisplayActive(true)}
                    />
                </div>
            }
            {userInfoShow}
        </header >
    )
}
