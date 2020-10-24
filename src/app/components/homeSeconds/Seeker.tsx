import React, { FC, useEffect, useRef, useState } from 'react'
import 'app/styles/homeSeconds/seeker.scss'
import StaticSeeker from 'static/seeker.json'
import Point from 'images/point.png'
import classnames from 'classnames'
import { isMobile } from '../common/utils'

interface SeekerProps {
    scrollIndex: number
}

const spinItemArr = ['left', 'right'] // 轮播项类名
const pointIndexArr = [0, 1]

const Seeker: FC<SeekerProps> = (props) => {
    const { scrollIndex } = props
    const [spinIndex, setSpinIndex] = useState(0) // 轮播Index
    const [isShow, setIsShow] = useState(scrollIndex === 2)
    const timer = useRef<NodeJS.Timeout | null>(null)
    const spin = () => {
        if (spinIndex) {
            setSpinIndex(0)
        } else {
            setSpinIndex(1)
        }
    }
    useEffect(() => {
        timer.current = setTimeout(() => {
            spin()
        }, 5000);
        return () => {
            if (timer.current) {
                clearTimeout(timer.current)
            }
        }
    }, [spinIndex])
    useEffect(() => {
        if (!isShow && scrollIndex === 2) {
            setIsShow(true)
        }
    }, [scrollIndex])
    return (
        <div className='seeker' >
            {
                !isMobile() && <div className='iphone'>
                    <div className={
                        classnames('iphone-img', {
                            'iphone-img-show': isShow
                        })
                    }></div>
                </div>
            }
            <div className='main' >
                <div className='turn-layout'>
                    {
                        StaticSeeker.map((seekerItem, index) => {
                            return (
                                <div
                                    key={index}
                                    className={
                                        classnames('spin-item', {
                                            [`spin-item-${spinItemArr[index]}-center`]: spinIndex === index
                                        })
                                    }
                                >
                                    <h2 className='title' >{seekerItem.title}</h2>
                                    <img src={Point} alt="" />
                                    <p className='description'>{seekerItem.description1}</p>
                                    <p className='description'>{seekerItem.description2}</p>
                                    <p className='description'>{seekerItem.description3}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className='select-layout' >
                    {
                        pointIndexArr.map(index => {
                            return <div
                                key={index}
                                className={
                                    classnames('select-point', {
                                        'select-point-active': spinIndex === index
                                    })
                                }
                                onClick={() => setSpinIndex(index)}
                            ></div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Seeker