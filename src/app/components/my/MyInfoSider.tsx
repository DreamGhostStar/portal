import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { IconFont } from '../common/config'
import 'app/styles/my/myInfoSider.scss'
import { menuItemConfig } from '../blog/BlogNav'

const stylePrefix = 'my-myInfoSider'

interface MyInfoSiderConfig {
    siderData: menuItemConfig[],
    siderIndex: number
}

export default function MyInfoSider({ siderData, siderIndex }: MyInfoSiderConfig) {
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    let history = useHistory();

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
                            <IconFont type={item.icon} style={{
                                marginRight: 20,
                                fontSize: 30,
                                marginLeft: 30
                            }} />
                            <span className={`${stylePrefix}-word`}>{item.title}</span>
                        </div>
                    );
                })
            }
        </>
    )
}