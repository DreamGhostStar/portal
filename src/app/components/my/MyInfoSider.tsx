import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IconFont } from '../common/config'
import 'app/styles/my/myInfoSider.scss'

const stylePrefix = 'my-myInfoSider'

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
        console.log(index)
        const contrast = {
            0: '/my/info',
            1: '/my/message'
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
                                borderTopLeftRadius: (index === 0 ? 5 : 0),
                                borderTopRightRadius: (index === 0 ? 5 : 0),
                                borderBottomLeftRadius: (index === 0 ? 0 : 5),
                                borderBottomRightRadius: (index === 0 ? 0 : 5)
                            }}
                            className={`${stylePrefix}-layout`}
                            onMouseOver={() => setMouseIndex(index)}
                            onMouseOut={() => { setMouseIndex(siderIndex) }}
                            onClick={() => handleClick(index)}
                        >
                            {temp}
                            <span className={`${stylePrefix}-word`}>{item}</span>
                        </div>
                    );
                })
            }
        </>
    )
}