import React, { useState, useEffect } from 'react'
import JiangXue from '../../../images/jiangxue.png'
import JiangFan from '../../../images/jiangfan.jpg'
import ujsComputer from '../../../images/ujsComputer.jpg'
import IRIS from '../../../images/IRIS.jpg'
import OKbang from '../../../images/OKbang.jpg'
import hongbaoRabit from '../../../images/hongbaoRabit.jpg'
import '../../styles/homeSeconds/production.scss'
import classnames from 'classnames'
import Driver from '../common/Driver'
import { isMobile } from '../common/utils'

interface ImgItemConfig {
    img: string;
    title: string;
    description: string;
    link: string;
    key: number;
}

const imgData: ImgItemConfig[] = [
    {
        key: 0,
        img: JiangXue,
        title: '江雪',
        description: '江苏大学校园服务 by Chi, FregZeng, Fallen Angel',
        link: '//snow.techf5ve.com'
    },
    {
        key: 1,
        img: JiangFan,
        title: '江帆',
        description: 'An open source game engine which is aimed to achieve high-efficency development by Y Huang',
        link: 'http://jiangfan.ujs.edu.cn',
    },
    {
        key: 2,
        img: ujsComputer,
        title: '江苏大学计算机官网',
        description: '江苏大学官方新闻站点 by Chi',
        link: '#',
    },
    {
        key: 3,
        img: IRIS,
        title: 'IRIS',
        description: 'O2O众包平台 by Chi, SX Wang',
        link: 'http://www.irislang.org',
    },
    {
        key: 4,
        img: OKbang,
        title: 'OK帮',
        description: '江苏大学计算机科学与通信工程学院 by Chi',
        link: '#',
    },
    {
        key: 5,
        img: hongbaoRabit,
        title: '红包兔',
        description: 'O2O众包平台 by Chi, SX Wang',
        link: '#',
    },
]
const pointIndexArr = [0, 1]

export default function ThreeContent() {
    const [spinIndex, setSpinIndex] = useState(0)
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    useEffect(() => {
        const timer = setTimeout(() => {
            setSpinIndex(spinIndex ? 0 : 1)
        }, 10000);
        return () => {
            clearTimeout(timer)
        }
    }, [spinIndex])
    // 构建主体页面（兼容webApp）
    const buildMain = () => {
        // 1行，每行2组，一组3张（0~2）,（3~6）
        // 3行，每行2组，一组1张（0）,（1）
        const mainLayoutArr = [];
        const staticMainDataArr: ImgItemConfig[][][] = [];
        const row = isMobile() ? 3 : 1; // 如果为手机则3行，pc为1行
        for (let index = 0; index < row; index++) {
            staticMainDataArr.push([])
            for (let j = 0; j < 2; j++) {
                staticMainDataArr[index].push(
                    imgData.slice(
                        imgData.length / 2 / row * j + index * 2,
                        imgData.length / 2 / row * (j + 1) + index * 2
                    )
                )
            }
        }
        for (let index = 0; index < staticMainDataArr.length; index++) {
            mainLayoutArr.push(
                <div className='main-layout' key={index}>
                    {
                        staticMainDataArr[index].map((mainData, index) => {
                            return <div
                                key={index}
                                className={
                                    classnames('main', {
                                        'main-center': spinIndex === index
                                    })
                                }
                            >
                                {
                                    mainData.map(imgItemData => {
                                        return buildImgRecommend(imgItemData)
                                    })
                                }
                            </div>
                        })
                    }
                </div>
            )
        }
        return (
            <>
                {mainLayoutArr}
            </>
        )
    }
    // 渲染介绍页面
    const buildImgRecommend = (imgItem: ImgItemConfig) => {
        return <div
            key={imgItem.key}
            className='img-item-layout'
        >
            <img
                src={imgItem.img}
                className={classnames('img-item', {
                    'img-item-active': mouseIndex === imgItem.key
                })}
                onMouseOver={() => setMouseIndex(imgItem.key)}
                onMouseOut={() => setMouseIndex(null)}
            />
            <h1 className='title' >{imgItem.title}</h1>
            <Driver className='driver' />
            <p className='description'>{imgItem.description}</p>
            <div
                className={classnames('shadow', {
                    'shadow-show': imgItem.key === mouseIndex
                })}
                onMouseOver={() => setMouseIndex(imgItem.key)}
                onMouseOut={() => setMouseIndex(null)}
                onClick={() => window.open(imgItem.link)}
            >VIEW MORE</div>
        </div>
    }
    return (
        <div className='production'>
            {buildMain()}
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
            <div className='start1-layout'>
                <div className='start1-btn' >
                    不因为被冷落，而停止去热爱
                </div>
            </div>
        </div>
    )
}