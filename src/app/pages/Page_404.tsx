import React from 'react'
import ghost from '../../images/ghost.png'
import '../styles/page/page_404.scss'

interface Page_404Config {
    retry: ((event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void) | undefined;
    word: string
}

export default function Page_404({ retry, word }: Page_404Config) {
    return (
        <div className='page_404'>
            <div className='content_404'>
                <img src={ghost} alt="幽灵" className='ghostImg' />
                <div className='ghostShadow'></div>
                <div className='tip_404'>Error</div>
                <div className='tipContent_404'>
                    {word}
                </div>
                <button className='button_404' onClick={retry}>返回</button>
            </div>
        </div>
    )
}