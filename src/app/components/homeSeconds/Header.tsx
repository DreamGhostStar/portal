import React, { useState, useRef, Fragment } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import TECHF5VELogoWhite from '../../../images/TechF5ve.png'
import TECHF5VELogoBlack from '../../../images/TechF5veBlack.png'
import AvatorShowContainer from '../../../containers/AvatarShow_container';
import '../../styles/homeSeconds/Header.scss'
import staticData from 'static/headerNav.json'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import NavItem from './NavItem';


export default function Header({ handleHeaderArchor, isFixed, scrollIndex }: {
  handleHeaderArchor: any,
  isFixed: boolean,
  scrollIndex: number
}) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isMouse, setIsMouse] = useState(false)
  const lineRef = useRef(null);

  const addActive = (index: number) => {
    (lineRef.current as any).style.left = index * 88 + 'px';

    setActiveIndex(index)
    setIsMouse(true)
  }

  const removeActive = (index: number) => {
    (lineRef.current as any).style.left = index * 88 + 'px';

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

      handleHeaderArchor(contrast[anchorName]);
    }
  }

  // 处理页面滚动的样式变化
  const handleNavStyle = (index: number) => {
    if (activeIndex === (index + 1) || activeIndex === (index - 1)) {
      if (!isMouse) {
        setActiveIndex(index);
        (lineRef.current as any).style.left = index * 88 + 'px';
      }
    }
  }

  var textColor = '#fff'; // 控制导航栏的文字颜色
  var headerBackColor = 'transparent'; // 控制导航栏的背景颜色
  var headerOpacity = 0; // 控制导航栏的透明度
  var imgIndex = 0; // 控制logo的颜色
  if (isFixed) {
    switch (scrollIndex) {
      case 0:
        headerOpacity = 0.3;
        handleNavStyle(scrollIndex)
        break;
      case 1:
        headerOpacity = 1;
        textColor = '#000';
        headerBackColor = '#fff';
        imgIndex = 1;
        handleNavStyle(scrollIndex) // 调整颜色变化
        break;
      case 2:
        headerOpacity = 0.7;
        textColor = '#000';
        headerBackColor = '#ccc';
        imgIndex = 1;
        handleNavStyle(scrollIndex)
        break;
      case 3:
        headerOpacity = 1;
        textColor = '#000';
        headerBackColor = '#fff';
        imgIndex = 1;
        handleNavStyle(scrollIndex)
        break;
      case 4:
        headerOpacity = 1;
        textColor = '#000';
        headerBackColor = '#fff';
        imgIndex = 1;
        handleNavStyle(scrollIndex)
        break;
      default:
    }
  }

  var temp = < Link to="/login" className="header_button">
    登录 / 注册
  </Link>

  let { user } = store.getState();

  if (user) {
    temp = <Provider store={store}>
      <AvatorShowContainer labelTop={65} />
    </Provider>
  }
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
            <div className="header_nav" style={{ float: "right" }}>
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
                temp
              }
              <div ref={lineRef} className='header_line'></div>
            </div>
          </nav>
        </header>
      </div>
      <div style={{
        width: '100%',
        height: 80,
        position: (isFixed ? 'fixed' : 'absolute'),
        opacity: headerOpacity,
        backgroundColor: headerBackColor,
        transitionDuration: '1s',
        zIndex: 198
      }}></div>
    </Fragment>
  )
}