import React, { useState, useEffect, useRef } from 'react'
import img1 from '../../../images/jiangxue.png'
import img2 from '../../../images/jiangfan.jpg'
import img3 from '../../../images/ujsComputer.jpg'
import img4 from '../../../images/IRIS.jpg'
import img5 from '../../../images/OKbang.jpg'
import img6 from '../../../images/hongbaoRabit.jpg'
import CircleIndicate from './CircleIndicate'
import ImageShow from './ImageShow'
import '../../styles/homeSeconds/threeContent.scss'
import { IconFont } from '../common/config'
import { isMobile } from '../common/utils'

const imgData = [
    {
        img: img1,
        decoration: '江雪'
    },
    {
        img: img2,
        decoration: '江帆'
    },
    {
        img: img3,
        decoration: '江苏大学计算机官网'
    },
    {
        img: img4,
        decoration: 'IRIS'
    },
    {
        img: img5,
        decoration: 'OK帮'
    },
    {
        img: img6,
        decoration: '红包兔'
    },
]

export default function ThreeContent() {
    const [turnIndex, setTurnIndex] = useState(0)
    const [returnIndex, setReturnIndex] = useState(5) // 反向轮播
    const [isMouse, setIsMouse] = useState(new Array(2).fill(false))
    const [isClear, setIsClear] = useState(false)
    const [isMouseCarousel, setIsMouseCarousel] = useState(false)
    const [allowCarousel, setAllowCarousel] = useState(true)
    const timer = useRef(null);

    useEffect(() => {
        if (isClear) {
            handleReduceCount();
        } else {
            handleAddCount();
        }
        return () => {
            clearInterval((timer.current as any));
        }
    }, [isClear])

    // 增加轮播的次数，避免轮播停止，停止轮播
    const handleReduceCount = () => {
        if (!allowCarousel) {
            setAllowCarousel(true)
            clearInterval((timer.current as any));
        }
    }

    // 减少轮播次数，避免轮播重复，轮播开始
    const handleAddCount = () => {
        if (allowCarousel) {
            (timer.current as any) = setInterval(() => {
                turn()
            }, 8000);
            setAllowCarousel(false)
        }
    }

    // 图片轮播
    const turn = () => {
        let turnIndexTemp = turnIndex;
        turnIndexTemp++;
        if (turnIndexTemp === imgData.length) {
            turnIndexTemp = 0;
        }
        setTurnIndex(turnIndexTemp)
    }

    // 处理箭头模块显示
    const handleMouseOver = (index: number) => {
        const isMouseTemp = isMouse;
        isMouseTemp[index] = true;
        setIsMouse(isMouseTemp)
    }

    const handleMouseOut = () => {
        setIsMouse(new Array(2).fill(false))
    }

    const handleLeftArrow = () => {
        let turnIndexTemp = turnIndex;
        turnIndexTemp--;
        if (turnIndexTemp === -1) {
            turnIndexTemp = imgData.length - 1;
        }

        setTurnIndex(turnIndexTemp)
    }

    const handleRightArrow = () => {
        let turnIndexTemp = turnIndex;
        turnIndexTemp++;
        if (turnIndexTemp === imgData.length) {
            turnIndexTemp = 0;
        }
        setTurnIndex(turnIndexTemp)
    }

    const handleClearInterval = () => {
        setIsClear(false);
        setIsMouseCarousel(false)
    }

    const handleSetInterval = () => {
        setIsClear(true);
        setIsMouseCarousel(true)
    }

    const handleChangePage = (index: number) => {
        setTurnIndex(index)
    }

    const generateCircleSection = () => {
        let item: any[] = [];

        for (var i = 0; i < imgData.length; i++) {
            item.push(
                <CircleIndicate
                    key={i}
                    index={i}
                    turnIndex={turnIndex}
                    handleChangePage={handleChangePage}
                />
            );
        }
        return item;
    }
    return (
        <div style={{
            height: isMobile() ? 600 : 900
        }} id='three'>
            <div className='threeContent'>
                <div className='threeContent_title'>作品展览</div>
                <div className='threeContent_titleLabel'>
                    一群热爱技术的人的作品
                </div>
                <div
                    className="threeContent_imgShow"
                    onMouseOver={handleSetInterval}
                    onMouseOut={handleClearInterval}
                >
                    {
                        imgData.map((item, index) => {
                            return (
                                <ImageShow
                                    img={item.img}
                                    key={index}
                                    decoration={item.decoration}
                                    index={index}
                                    turnIndex={turnIndex}
                                />
                            )
                        })
                    }
                    {
                        isMobile()
                            ? <div></div>
                            : <>
                                {/* 左侧遮罩层 */}
                                <div
                                    style={{
                                        backgroundColor: (isMouse[0] ? '#000' : 'transparent'),
                                        opacity: (isMouse[0] ? 0.3 : 1),
                                    }}
                                    className='threeContent_shadow'
                                    onMouseOver={() => handleMouseOver(0)}
                                    onMouseOut={handleMouseOut}
                                >
                                </div>
                                {/* 右侧遮罩层 */}
                                <div
                                    style={{
                                        backgroundColor: (isMouse[1] ? '#000' : 'transparent'),
                                        opacity: (isMouse[1] ? 0.3 : 1),
                                        right: 0
                                    }}
                                    className='threeContent_shadow'
                                    onMouseOver={() => handleMouseOver(1)}
                                    onMouseOut={handleMouseOut}
                                >
                                </div>
                                {/* 左箭头 */}
                                <IconFont
                                    type='anticonzuotubiao'
                                    style={{
                                        display: (isMouseCarousel ? 'block' : 'none')
                                    }}
                                    className="removeFloat threeContent_arrow"
                                    onMouseOver={() => handleMouseOver(0)}
                                    onMouseOut={handleMouseOut}
                                    onClick={handleLeftArrow}
                                />
                                {/* 右箭头 */}
                                <IconFont
                                    type='anticonyou'
                                    style={{
                                        right: 0,
                                        display: (isMouseCarousel ? 'block' : 'none')
                                    }}
                                    className="removeFloat threeContent_arrow"
                                    onMouseOver={() => handleMouseOver(1)}
                                    onMouseOut={handleMouseOut}
                                    onClick={handleRightArrow}
                                />
                            </>
                    }

                </div>
                <div style={{
                    height: 30,
                    width: (imgData.length * 60),
                    margin: '40px auto',
                    display: 'flex',
                    justifyContent: 'space-between'
                }}>
                    {generateCircleSection()}
                </div>
            </div>
        </div>
    )
}