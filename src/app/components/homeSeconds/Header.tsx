import React, { FC, useEffect, useState } from 'react'
import 'app/styles/homeSeconds/header.scss'
import TECHWhite from 'images/logo/TECH_white.png'
import TECHBlack from 'images/logo/TECH_black.png'
import F5VEWhite from 'images/logo/F5VE_white.png'
import F5VEBlack from 'images/logo/F5VE_black.png'
import { goToElement, isMobile } from '../common/utils'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import MenuIcon from '../common/MenuIcon'

const logo = {
  tech: {
    white: TECHWhite,
    black: TECHBlack
  },
  f5ve: {
    white: F5VEWhite,
    black: F5VEBlack
  }
}

interface NavConfig {
  name: string;
  href: string;
}

const navArr: NavConfig[] = [
  {
    name: '博客/Blog',
    href: 'blog'
  },
  {
    name: '服务',
    href: 'service'
  },
  {
    name: '实例',
    href: 'production'
  },
  {
    name: '团队',
    href: 'friend'
  },
  {
    name: '联系',
    href: 'contact'
  }
]

const Header: FC = () => {
  const history = useHistory()
  const [isFixed, setIsFixed] = useState(false)
  const [showMenu, setShowMenu] = useState(false)
  const handleScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    if (scrollTop > 50) {
      setIsFixed(true)
    } else {
      setIsFixed(false)
    }
  }
  useEffect(() => {
    document.addEventListener('scroll', handleScroll)
    return () => {
      document.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const handleClickNav = (nav: NavConfig) => {
    if (nav.href === 'blog') {
      history.push('/blog')
    } else {
      goToElement(nav.href)
    }
  }
  const buildNav = (isShow: boolean) => {
    return (
      isShow
        ? <div className='nav-layout' >
          {
            navArr.map((nav, index) => {
              return <p
                key={index}
                className={classnames('nav', {
                  'nav-fixed': isFixed
                })}
                onClick={() => handleClickNav(nav)}
              >
                {nav.name}
              </p>
            })
          }
        </div>
        : <></>
    )
  }
  return (
    <div className={
      classnames('home-header', {
        'home-header-fixed': isFixed
      })
    }>
      <div className='header-layout' >
        <div className='img-layout' >
          <img src={isFixed ? logo.tech.black : logo.tech.white} alt="" className='tech' />
          <img src={isFixed ? logo.f5ve.black : logo.f5ve.white} alt="" className='f5ve' id='f5ve' />
        </div>
        {
          isMobile()
            ? <MenuIcon
              color={isFixed ? '#000' : '#fff'}
              setShowMenu={setShowMenu}
              showMenu={showMenu}
            />
            : <div></div>
        }
        {buildNav(!isMobile())}
      </div>
      {buildNav(isMobile() && showMenu)}
    </div>
  )
}

export default Header