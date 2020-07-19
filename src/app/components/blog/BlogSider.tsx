import React, { useState, useEffect, useRef } from 'react'
import '../../styles/blog/layoutContent.scss'
import MenuItem_container from '../../../containers/MenuItem_container'
import store from '../../../redux/store'
import { Provider } from 'react-redux'
import menuData from 'static/articleKindList.json'
import { deepCopy } from '../common/utils'

export default function BlogSider() {
    const [isFixed, setIsFixed] = useState(false)
    const [clickIndex, setClickIndex] = useState(store.getState().type)
    const [display, setDisplay] = useState(new Array(4).fill(true))
    // const [currentType, setCurrentType] = useState(0)
    const inputRef = useRef(null)
    useEffect(() => {
        store.subscribe(() => { // 监听redux变化
            let obj = store.getState();
            setClickIndex(obj.type)
        })
    }, [store.getState()])
    useEffect(() => {
        window.addEventListener('scroll', monitor);
        return () => {
            window.removeEventListener('scroll', monitor)
        }
    }, [])
    const monitor = () => {
        const scrollTop = document.documentElement.scrollTop;
        if (scrollTop > 60) {
            setIsFixed(true)
        } else {
            setIsFixed(false)
        }
    }

    const coverString = (subStr: string, str: string) => {
        const reg = eval("/" + subStr + "/ig");
        return reg.test(str);
    }

    // 目录栏模糊搜索
    const handleChange = () => {
        const inputData = (inputRef.current as any).value;
        const tempDisplay = deepCopy(display);
        menuData.map((item, index) => {
            if (inputData === "") {
                tempDisplay[index] = true;
                return index;
            }

            if (coverString(inputData, item.title)) {
                tempDisplay[index] = true;
            } else {
                tempDisplay[index] = false;
            }
        })

        setDisplay(tempDisplay)
    }

    // 处理MenuItem中点击时产生的数据变量（isClick）
    const handleItemData = (index: number) => {
        setClickIndex(index)
        // setCurrentType(index)
    }
    // TODO: 更新前状态，包含最新props，测试是否能正常运行
    // componentWillReceiveProps(nextProps) {
    //     const { typeIndex } = nextProps;
    //     if (typeof typeIndex === 'number') {
    //         // 避免重复调用
    //         if (typeIndex !== this.state.currentType) {
    //             this.handleItemData(typeIndex)
    //         }
    //     }
    // }
    return (
        <div
            style={{
                top: (isFixed ? 20 : 80),
            }}
            className='blogSider'
        >
            <div className='blogSider_search'>
                <input
                    type="text"
                    style={{
                        width: 214,
                        height: 30,
                        backgroundColor: '#66CCFF',
                        border: '1px solid #fff',
                        borderRadius: '15px',
                        marginTop: 10,
                        marginLeft: 22,
                        outline: 'none',
                        textIndent: 15,
                        color: '#fff'
                    }}
                    ref={inputRef}
                    onChange={handleChange}
                />
            </div>
            {
                menuData.map((item, index) => {
                    return (
                        <Provider store={store} key={index}>
                            <MenuItem_container
                                clickIndex={clickIndex}
                                item={item}
                                index={index}
                                handleItemData={handleItemData}
                                display={display}
                            />
                        </Provider>
                    )
                })
            }
        </div>
    )
}