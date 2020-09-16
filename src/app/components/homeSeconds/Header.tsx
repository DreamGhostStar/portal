import React, { useState, useRef, Fragment, useEffect } from 'react'
import { HashRouter as Router, Link, useHistory } from 'react-router-dom'
import TECHF5VELogoWhite from '../../../images/TechF5ve.png'
import TECHF5VELogoBlack from '../../../images/TechF5veBlack.png'
import AuthorShow_container from '../../../containers/AuthorShow_container';
import '../../styles/homeSeconds/Header.scss'
import staticData from 'static/headerNav.json'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import NavItem from './NavItem';
import { isMobile, isLogin, getToken } from '../common/utils';
import { IconFont } from '../common/config';
import userInfo from 'model/userInfo.json' // TODO: 需删除

interface HeaderConfig {
  handleHeaderArchor: any,
  isFixed: boolean,
  scrollIndex: number
  transform_user: (user: any) => {
    type: string;
    data: any;
  }
}

export default function Header({ handleHeaderArchor, isFixed, scrollIndex, transform_user }: HeaderConfig) {
  const history = useHistory()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMouse, setIsMouse] = useState(false)
  const [textColor, setTextColor] = useState('#fff')
  const [headerBackColor, setHeaderBackColor] = useState('transparent')
  const [headerOpacity, setHeaderOpacity] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [avatarShow, setAvatarShow] = useState(
    < Link to="/login" className="header_button">
      登录 / 注册
    </Link>
  )
  const lineRef = useRef(null);

  // 改变线的位置
  const setLineStyle = (style: string) => {
    if (lineRef.current) {
      (lineRef.current as any).style.right = style;
    }
  }

  const addActive = (index: number) => {
    setLineStyle((5 - index) * 88 + 110 + 40 + 'px')

    setActiveIndex(index)
    setIsMouse(true)
  }

  const removeActive = (index: number) => {
    setLineStyle('590px');

    setActiveIndex(index)
    setIsMouse(false)
  }

  const handleAnchor = (anchorName: string) => {
    const contrast = {
      first: 0,
      second: 1,
      third: 2,
      four: 3,
      five: 4,
    }
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) { anchorElement.scrollIntoView({ block: 'start', behavior: 'smooth' }); }

      if (contrast[anchorName]) {
        handleHeaderArchor(contrast[anchorName]);
      }
    }
  }

  // 处理页面滚动的样式变化
  const handleNavStyle = (index: number) => {
    if (activeIndex === (index + 1) || activeIndex === (index - 1)) {
      if (!isMouse) {
        setActiveIndex(index);
        setLineStyle((5 - index) * 88 + 110 + 40 + 'px');
      }
    }
  }

  // 进入不同的路由
  const entryRouter = (routerName: string) => {
    history.push(routerName);
  }

  // 处理右侧导航栏的移动端兼容
  const showNav = () => {
    return isMobile()
      ? <div>
        <div
          className='header_icon_layout'
        >
          <IconFont
            type='anticonjinru'
            className='header_icon'
            style={{
              color: textColor
            }}
            onClick={() => entryRouter('/blog/undefined')}
          />
          {
            isLogin()
              ? <Provider store={store}>
                <AuthorShow_container top={0} labelTop={65} isHome={true} />
              </Provider>
              : <IconFont
                type='anticondenglu'
                className='header_icon'
                style={{
                  color: textColor
                }}
                onClick={() => entryRouter('/login')}
              />
          }
        </div>
      </div>
      : <div className="header_nav">
        {
          staticData.map((item, index) => {
            return <NavItem
              key={index}
              index={index}
              activeIndex={activeIndex}
              textColor={textColor}
              scrollIndex={scrollIndex}
              item={item}
              addActive={addActive}
              removeActive={removeActive}
              handleAnchor={handleAnchor}
            />
          })
        }
        <Link
          to={{
            pathname: `/blog/undefined`
          }}
          style={{
            color: (activeIndex === 5 ? '#f00' : textColor)
          }}
          className='navItem'
          onMouseOver={() => addActive(5)}
          onMouseOut={() => removeActive(scrollIndex)}
        >
          博客
    </Link>
        {
          avatarShow
        }
      </div>
  }

  useEffect(() => {
    if (isFixed) {
      switch (scrollIndex) {
        case 0:
          setHeaderOpacity(0)
          setTextColor('#fff');
          setHeaderBackColor('transparent')
          setImgIndex(0)
          handleNavStyle(scrollIndex)
          break;
        case 1:
          setHeaderOpacity(1)
          setTextColor('#000');
          setHeaderBackColor('#fff')
          setImgIndex(1)
          handleNavStyle(scrollIndex) // 调整颜色变化
          break;
        case 2:
          setHeaderOpacity(0.7)
          setTextColor('#000');
          setHeaderBackColor('#ccc')
          setImgIndex(1)
          handleNavStyle(scrollIndex)
          break;
        case 3:
          setHeaderOpacity(0.7)
          setTextColor('#000');
          setHeaderBackColor('#fff')
          setImgIndex(1)
          handleNavStyle(scrollIndex)
          break;
        case 4:
          setHeaderOpacity(1)
          setTextColor('#000');
          setHeaderBackColor('#fff')
          setImgIndex(1)
          handleNavStyle(scrollIndex)
          break;
        default:
      }
    }
  }, [isFixed, scrollIndex])

  useEffect(() => {
    let temp = < Link to="/login" className="header_button">
      登录 / 注册
    </Link>

    let { user } = store.getState();

    if (user) {
      temp = <div style={{ width: 110 }}>
        <Provider store={store}>
          <AuthorShow_container top={10} labelTop={65} isHome={true} />
        </Provider>
      </div>
    }
    setAvatarShow(temp)
  }, [store.getState()])

  useEffect(() => {
    if (getToken()) {
      transform_user(userInfo)
    }
  }, [])
  return (
    <Fragment>
      <div
        style={{
          position: (isFixed ? 'fixed' : 'absolute'),
        }}
        className='header_marginPiece'
      >
        <header className='header_paddingPiece'>
          <nav className='header_navContent'>
            <img
              src={imgIndex === 0 ? TECHF5VELogoWhite : TECHF5VELogoBlack}
              alt="logo"
              className='header_img'
            />
            {showNav()}
          </nav>
          {
            isMobile() ? <div></div> : <div ref={lineRef} className='header_line'></div>
          }
        </header>
      </div>
      <div
        style={{
          width: '100%',
          height: isMobile() ? '4rem' : '80px', // 80px
          position: (isFixed ? 'fixed' : 'absolute'),
          opacity: headerOpacity,
          backgroundColor: headerBackColor,
          transitionDuration: '1s',
          zIndex: 198
        }}
      ></div>
    </Fragment>
  )
}