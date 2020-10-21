/* 
 * 第二部分三张卡片模型
*/
import React from 'react'
import '../../styles/homeSeconds/secondContent.scss'
import Point from 'images/point.png'
import { IconFont } from '../common/config'

interface secondContentConfig {
    title: string;
    description: string;
    URL?: string
}

export default function SecondContent({ scrollIndex }: { scrollIndex: number }) {

    return (
        <div className='secondContent' >
            <h1 className='title-one' >I GOT 99 PROBLEMS</h1>
            <h3 className='title-two' >BUT <em>CREATION</em> AINT ONE</h3>
            <h2 className='description' >爱我所爱，随心所欲</h2>
            <img src={Point} alt="point" className='point' />
            <div className='apply-layout' >
                <div>
                    <div className='apply-icon-layout' >
                        <span className="anticon-portal apply-icon">&#xe73e;</span>
                    </div>
                </div>
                <div>
                    <div className='apply-icon-layout' >
                        <span className="anticon-portal apply-icon">&#xe613;</span>
                    </div>
                </div>
                <div>
                    <div className='apply-icon-layout' >
                        <span className="anticon-portal apply-icon">&#xe88b;</span>
                    </div>
                </div>
            </div>
        </div>
    )
}