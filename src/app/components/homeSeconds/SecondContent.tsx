/* 
 * 第二部分三张卡片模型
*/
import React, { useState, useEffect } from 'react'
import CardDemo from './OnlyCard'
import '../../styles/homeSeconds/secondContent.scss'
import art from '../../../images/art.jpg'
import security from '../../../images/security.jpg'
import software from '../../../images/software.jpg'
import data from 'static/secondContent.json'

interface secondContentConfig {
    title: string;
    description: string;
    URL?: string
}

export default function SecondContent({ scrollIndex }: { scrollIndex: number }) {
    const [secondData, setSecondData] = useState<secondContentConfig[]>([])
    useEffect(() => {
        let temp: any[] = [];

        data.map((item: secondContentConfig, index) => {
            switch (index) {
                case 0:
                    item.URL = security
                    break;
                case 1:
                    item.URL = software
                    break;
                case 2:
                    item.URL = art
                    break;
                default:
            }

            temp.push(item);
            return null;
        });

        setSecondData(data)
    }, [])
    return (
        <>
            <div
                className='secondContent_title'
                style={{
                    top: (scrollIndex === 1 ? 0 : -50),
                    opacity: (scrollIndex === 1 ? 1 : 0),
                }}
            >
                OUR CASES
            </div>
            <div
                style={{
                    top: (scrollIndex === 1 ? 0 : 50),
                    opacity: (scrollIndex === 1 ? 1 : 0),
                    transitionDuration: '1s',
                }}
                className='secondContent_titleLabel'
            >
                我们的服务
            </div>
            <div className='secondContent_cardPiece'>
                {
                    secondData.map((item, index) => {

                        return (
                            <div key={index} style={{
                                opacity: (scrollIndex === 1 ? 1 : 0),
                                transitionDuration: '1s',
                                transitionDelay: `${(index * 1)}s`
                            }}>
                                <CardDemo data={item} index={index} scrollIndex={scrollIndex} />
                            </div>
                        );
                    })
                }
            </div>
        </>
    )
}