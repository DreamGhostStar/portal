/* 
 * 第二部分三张卡片模型
*/
import React, { useEffect, useState } from 'react'
import '../../styles/homeSeconds/secondContent.scss'
import Point from 'images/point.png'
import staticSecondContent from 'static/secondContent.json'
import Driver from '../common/Driver'

export default function SecondContent({ scrollIndex }: { scrollIndex: number }) {
    const [isShow, setIsShow] = useState(scrollIndex === 1) // js控制动画显示
    useEffect(() => {
        if (!isShow && scrollIndex === 1) {
            setIsShow(true)
        }
    }, [scrollIndex])
    return (
        <div className='secondContent' >
            <h1 className='title-one' >I GOT 99 PROBLEMS</h1>
            <h3 className='title-two' >BUT <em>CREATION</em> AINT ONE</h3>
            <h2 className='description' >爱我所爱，随心所欲</h2>
            <img src={Point} alt="point" className='point' />
            <div className='apply-layout' >
                {
                    staticSecondContent.map((applyItem, index) => {
                        return (
                            <div
                                key={index}
                                className='apply-item-layout'
                                style={{
                                    opacity: isShow ? 1 : 0,
                                    bottom: isShow ? 0 : -40,
                                    transitionDelay: 1 * index + 's'
                                }}
                            >
                                <div className='apply-icon-layout' >
                                    <span
                                        className="anticon-portal apply-icon"
                                        dangerouslySetInnerHTML={{ __html: applyItem.icon }}
                                    ></span>
                                </div>
                                <h4 className='apply-item-title'>{applyItem.title}</h4>
                                <Driver className='apply-item-driver' />
                                <p className='apply-item-description' >{applyItem.description}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}