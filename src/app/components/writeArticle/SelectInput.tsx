import React, { useState } from 'react'
import '../../styles/edit/selectInput.scss'
import menuData from 'static/articleKindList.json'
import { IconFont } from '../common/config'

interface SelectInputConfig {
    handleSelectType: any
}

export default function SelectInput({ handleSelectType }: SelectInputConfig) {
    const [selectIndex, setSelectIndex] = useState(0)
    const [isClick, setIsClick] = useState(false)
    const [selectName, setSelectName] = useState(menuData[0].title)
    const handleSelectIndex = (tempSelectIndex: number) => {
        const tempSelectName = menuData[selectIndex].title;
        handleSelectType(selectIndex)
        setSelectIndex(tempSelectIndex)
        setSelectName(tempSelectName)
    }
    return (
        <div style={{
            position: 'relative'
        }}>
            <div
                className='selectInput'
                onClick={() => { setIsClick(true) }}
                onBlur={() => { setIsClick(false) }}
                tabIndex={0}
                style={{
                    backgroundColor: (isClick ? '#fff' : '#ccc'),
                    color: (isClick ? '#ccc' : '#fff')
                }}
            >
                {selectName}
            </div>
            <IconFont
                className='selectIcon'
                tabIndex={0}
                type={isClick ? 'anticonshangjiantou' : 'anticondownarrow'}
                style={{
                    color: (isClick ? '#ccc' : '#fff')
                }}
                onClick={() => { setIsClick(!isClick) }}
                onBlur={() => { setIsClick(false) }}
            />
            <div className='selectMenu'>
                {
                    menuData.map((item, index) => {
                        if (index !== selectIndex) {
                            return <div
                                className='selectItem'
                                key={index}
                                style={{
                                    color: (isClick ? '#ccc' : '#fff'),
                                    height: (isClick ? 50 : 0)
                                }}
                                onMouseDown={() => handleSelectIndex(index)}
                            >
                                {isClick ? item.title : ''}
                            </div>
                        }

                        return null;
                    })
                }
            </div>
        </div>
    )
}