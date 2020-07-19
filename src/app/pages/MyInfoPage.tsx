import React, { useState, useEffect } from 'react'
import BlogHeader from '../components/blog/BlogHeader'
import MyInfoSider from '../components/my/MyInfoSider';
import MyInfoMessageContent from '../components/my/MyInfoMessageContent';
import MyInfo from '../components/my/MyInfo';
import '../styles/page/myInfoPage.scss'
import staticSiderData from 'static/myInfoSider.json'

export default function MyInfoPage(props: any) {
    const { type } = props.match.params;
    const [clickIndex, setClickIndex] = useState(0)
    const [messageData, setMessageData] = useState([])
    // 判断显示哪个页面
    const judgeShowPage = (clickIndex: number) => {
        const contrast = {
            0: <MyInfo />,
            1: <MyInfoMessageContent />
        }
        return contrast[clickIndex]
    }

    useEffect(() => {
        if (type === 'message') {
            setClickIndex(1)
        }
    }, [type])
    return (
        <>
            <div className='myInfoPage'>
                <BlogHeader activeIndex={2} />
                <div className='myInfoPage_sider'>
                    <div className='myInfoPage_subitem'>
                        <MyInfoSider siderData={staticSiderData} siderIndex={clickIndex} />
                    </div>
                    {
                        judgeShowPage(clickIndex)
                    }
                </div>
            </div>
            <div style={{
                height: '100%',
                width: '100%',
                position: 'fixed',
                backgroundColor: '#eee',
                backgroundAttachment: 'fixed',
                backgroundSize: 'cover',
                backgroundPosition: 'center top',
                zIndex: 1
            }}>

            </div>
        </>
    )
}