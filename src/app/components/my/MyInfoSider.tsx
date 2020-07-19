import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IconFont } from '../common/config'

interface MyInfoSiderConfig {
    siderData: any[],
    siderIndex: number
}

export default function MyInfoSider({ siderData, siderIndex }: MyInfoSiderConfig) {
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    let history = useHistory();

    const handleIndex = (typeName: string) => { // 渲染侧边栏的数据
        return (
            <IconFont type={typeName} style={{
                marginRight: 20,
                fontSize: 30,
                marginLeft: 30
            }} />
        )
    }

    const handleClick = (index: number) => {
        const contrast = {
            1: '/my/info',
            2: '/my/message'
        }

        history.push(contrast[index]);
    }
    return (
        <>
            {
                siderData.map((item, index) => {
                    var temp;
                    switch (index) {
                        case 0:
                            temp = handleIndex("anticonart2");
                            break;
                        case 1:
                            temp = handleIndex("anticonwodexiaoxi");
                            break;
                        default:
                    }
                    return (
                        <div
                            key={index}
                            style={{
                                backgroundColor: (mouseIndex === index || siderIndex === index ? '#00CCFF' : '#fff'),
                                height: 60,
                                lineHeight: '60px',
                                cursor: 'pointer',
                                borderTopLeftRadius: (index === 0 ? 5 : 0),
                                borderTopRightRadius: (index === 0 ? 5 : 0),
                                borderBottomLeftRadius: (index === 0 ? 0 : 5),
                                borderBottomRightRadius: (index === 0 ? 0 : 5)
                            }}
                            onMouseOver={() => setMouseIndex(index)}
                            onMouseOut={() => { setMouseIndex(siderIndex) }}
                            onClick={() => handleClick(index)}
                        >
                            {temp}
                            <span style={{
                                fontSize: 20
                            }}>{item}</span>
                        </div>
                    );
                })
            }
        </>
    )
}