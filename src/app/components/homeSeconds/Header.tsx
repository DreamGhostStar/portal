import React, { useState, useRef, Fragment, useEffect } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import TECHF5VELogoWhite from '../../../images/TechF5ve.png'
import TECHF5VELogoBlack from '../../../images/TechF5veBlack.png'
import AuthorShow_container from '../../../containers/AuthorShow_container';
import '../../styles/homeSeconds/Header.scss'
import staticData from 'static/headerNav.json'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import NavItem from './NavItem';
import { isMobile } from '../common/utils';
import { IconFont } from '../common/config';
import Driver from '../common/Driver';

interface HeaderConfig {
  handleHeaderArchor: any,
  isFixed: boolean,
  scrollIndex: number
}

export default function Header({ handleHeaderArchor, isFixed, scrollIndex }: HeaderConfig) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMouse, setIsMouse] = useState(false)
  const [textColor, setTextColor] = useState('#fff')
  const [headerBackColor, setHeaderBackColor] = useState('transparent')
  const [headerOpacity, setHeaderOpacity] = useState(0)
  const [imgIndex, setImgIndex] = useState(0)
  const [showMobileNav, setShowMobileNav] = useState(false)
  const [avatarShow, setAvatarShow] = useState(
    < Link to="/login" className="header_button">
      登录 / 注册
    </Link>
  )
  const lineRef = useRef(null);

  const addActive = (index: number) => {
    (lineRef.current as any).style.right = (5 - index) * 88 + 110 + 40 + 'px';

    setActiveIndex(index)
    setIsMouse(true)
  }

  const removeActive = (index: number) => {
    (lineRef.current as any).style.right = '590px';

    setActiveIndex(index)
    setIsMouse(false)
  }

  const handleAnchor = (anchorName: string) => {
    const contrast = {
      first: 0,
      second: 1,
      third: 2
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
        (lineRef.current as any).style.right = (5 - index) * 88 + 110 + 40 + 'px';
      }
    }
  }

  // 处理右侧导航栏的移动端兼容
  const showNav = () => {
    return isMobile()
      ? <div>
        <div
          className='header_icon_layout'
          style={{
            backgroundColor: showMobileNav ? '#ccc' : 'transparent'
          }}
        >
          <IconFont
            type='anticoncaidan'
            className='header_icon'
            onClick={() => setShowMobileNav(!showMobileNav)}
          />
        </div>
        <div
          className='header_nav_mobile'
          style={{
            border: showMobileNav ? '1px solid #ccc' : 'none',
          }}
        >
          {
            staticData.map((navItem, index) => {
              return <div
                key={index}
                style={{
                  display: showMobileNav ? 'block' : 'none', // 控制显示
                }}
                className='header_nav_mobile_item'
              >
                <p className='header_nav_mobile_item_word'>{navItem.content}</p>
                {
                  index !== 4 && <Driver backgroundColor='#eee' height={1} />
                }
              </div>
            })
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
          <AuthorShow_container labelTop={65} isHome={true} />
        </Provider>
      </div>
    }
    setAvatarShow(temp)
  }, [store.getState()])
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