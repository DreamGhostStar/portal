import React, { useState, useEffect, createContext } from 'react'
import BlogHeader from '../components/blog/BlogHeader'
import MyInfoSider from '../components/my/MyInfoSider';
import MyInfoMessageContent from '../components/my/MyInfoMessageContent';
import MyInfo from '../components/my/MyInfo';
import '../styles/page/myInfoPage.scss'
import staticSiderData from 'static/myInfoSider.json'
import BackGround from 'app/components/common/BackGround';
import { isMobile } from 'app/components/common/utils';
interface IMyMenuContext {
    index: number;
    onClick?: React.Dispatch<React.SetStateAction<number>>;
}

export const MySiderContext = createContext<IMyMenuContext>({ index: 0 })
export default function MyInfoPage(props: any) {
    const { type } = props.match.params;
    const [clickIndex, setClickIndex] = useState(0)
    const menuContext: IMyMenuContext = {
        index: clickIndex,
        onClick: setClickIndex,
    }
    // 判断显示哪个页面
    const judgeShowPage = (clickIndex: number) => {
        const contrast = {
            0: <MyInfo />,
            1: <MyInfoMessageContent />
        }
        return contrast[clickIndex]
    }

    useEffect(() => {
        const contrast = {
            info: 0,
            message: 1
        }
        setClickIndex(contrast[type])
    }, [type])
    return (
        <>
            <div className='myInfoPage'>
                <MySiderContext.Provider value={menuContext} >
                    <BlogHeader activeIndex={1} />
                </MySiderContext.Provider>
                <div className='myInfoPage_sider'>
                    {
                        !isMobile() && <div className='myInfoPage_subitem'>
                            <MyInfoSider siderData={staticSiderData} siderIndex={clickIndex} />
                        </div>
                    }
                    {
                        judgeShowPage(clickIndex)
                    }
                </div>
            </div>
            {
                !isMobile() && <BackGround />
            }
        </>
    )
}