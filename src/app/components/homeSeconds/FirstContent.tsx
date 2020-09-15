import React from 'react'
import '../../styles/homeSeconds/firstContent.scss'
import { isMobile } from '../common/utils'
import Star from '../common/Star'

// 星星位置
const pos = [
    {
        top: 20,
        left: 20,
        scale: 0.5,
        duration: '2s'
    },
    {
        top: 370,
        left: 1200,
        scale: 0.3,
        duration: '2.7s'
    },
    {
        top: 200,
        left: 400,
        scale: 0.4,
        duration: '3s'
    },
    {
        top: 80,
        left: 1500,
        scale: 0.6,
        duration: '2.3s'
    },
    {
        top: 70,
        left: 300,
        scale: 0.3,
        duration: '4s'
    },
]

export default function FirstContent() {
    if (isMobile()) {
        return (
            <div className='homePage_firstContent' id='first'>
                <div className='firstContent'>
                    <div className='firstContent_text'>Grow Together</div>
                    <div className='firstContent_text'>WHAT IS NOT VISIBLE IS NOT INVISIBLE</div>
                    <div className='firstContent_text'>尝试科技与设计的工作室 APPLICATION/SECURITY/DESIGN</div>
                </div>
            </div>
        )
    } else {
        return (
            <div className='homePage_firstContent' id='first'>
                <div className='firstContent'>
                    <div className='firstContent_text'>Grow Together</div>
                    <div className='firstContent_text'>WHAT IS NOT VISIBLE IS NOT INVISIBLE</div>
                    <div className='firstContent_text'>尝试科技与设计的工作室 APPLICATION/SECURITY/DESIGN</div>
                </div>
                {
                    // 遍历生成星星
                    pos.map((item, index) => {
                        return <Star item={item} key={index} screenWidth={window.innerWidth} />
                    })
                }
            </div>
        )
    }
}