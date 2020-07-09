import React, { useState } from 'react'
import '../../styles/homeSeconds/secondContent.scss'

interface onlyCardDataConfig {
    data: any,
    scrollIndex: number,
    index: number
}

export default function OnlyCard({data, scrollIndex, index}: onlyCardDataConfig) {
    const [isMouse, setIsMouse] = useState(false)
    
    // 生成卡片的标题
    const generateTitleNode = (data: any, index: number) => {
        const { title } = data;
        // 由于图片大小不一致，需进行针对性改变
        if ((index === 1) || (index === 2)) {
            return (
                <p style={{
                    color: '#fff',
                    fontSize: 24,
                    marginTop: 70
                }}>{title}</p>
            );
        } else if (index === 0) {
            return (
                <p style={{
                    color: '#fff',
                    fontSize: 24,
                    marginTop: 30
                }}>{title}</p>
            );
        }
        return (
            <p style={{
                color: '#fff',
                fontSize: 24
            }}>{title}</p>
        )
    }

    // 生成卡片的叙述
    const generateDescriptionNode = (data: any) => {
        const { description } = data;
        return (
            <p style={{
                color: '#fff',
                marginBottom: 0
            }}>{description}</p>
        )
    }
    return (
        <div
            onMouseOver={() => {setIsMouse(true)}}
            onMouseOut={() => {setIsMouse(false)}}
            style={{
                boxShadow: (isMouse ? '0px 0px 10px #888888' : 'none'),
                height: 600,
                textAlign: 'center',
                width: 300,
                position: 'relative',
                borderRadius: 20
            }}
        >
            <img src={data.URL} alt="xxx" style={{
                width: 300,
                height: 600,
                borderRadius: 20
            }} />
            <div style={{
                position: 'absolute',
                top: '50%'
            }}>
                <div style={{
                    fontSize: 30,
                    margin: '20px 0px',
                    color: 'white',
                    position: 'relative',
                    top: (scrollIndex === 1 ? 0 : -50),
                    transitionDelay: `${(index * 1)}s`,
                    transitionDuration: '.5s',
                    zIndex: 4
                }}>
                    {data.title}
                </div>
                <div style={{
                    color: 'white',
                    position: 'relative',
                    top: (scrollIndex === 1 ? 0 : 50),
                    transitionDuration: '.5s',
                    transitionDelay: `${(index * 1)}s`,
                    zIndex: 4,
                    paddingBottom: 20
                }}>
                    {data.description}
                </div>
                <div style={{
                    width: 300,
                    top: 0,
                    position: 'absolute',
                    height: '100%',
                    backgroundColor: '#000',
                    opacity: 0.5,
                    zIndex: 3
                }}></div>
            </div>
        </div>
    )
}