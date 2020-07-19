import React from 'react'
import ghost from '../../images/ghost.png'
import '../styles/page/page_404.scss'
import { useHistory } from 'react-router-dom'

export default function Page_404() {
    let history = useHistory();
    const handleClick = () => {
        history.goBack()
    }
    return (
        <div className='page_404'>
            <div className='content_404'>
                <img src={ghost} alt="幽灵" className='ghostImg' />
                <div className='ghostShadow'></div>
                <div className='tip_404'>404 错误！</div>
                <div className='tipContent_404'>
                    看来我们找不到你要找的那
                    <br />
                    一页
                </div>
                <div className='button_404' onClick={handleClick}>返回</div>
            </div>
        </div>
    )
}