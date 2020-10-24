import React, { useState, useEffect, useRef } from 'react'
import '../../styles/blog/blogSider.scss'
import MenuItem_container from '../../../containers/MenuItem_container'
import store from '../../../redux/store'
import { Provider } from 'react-redux'
import menuData from 'static/articleKindList.json'
import { deepCopy } from '../common/utils'

const stylePrefix = 'blog-blogSider'

export default function BlogSider() {
    const [display, setDisplay] = useState(new Array(4).fill(true))
    const inputRef = useRef(null)

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
    return (
        <div className={`${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-search-layout`}>
                <input
                    type="text"
                    className={`${stylePrefix}-search-input`}
                    ref={inputRef}
                    onChange={handleChange}
                />
            </div>
            {
                menuData.map((item, index) => {
                    return (
                        <Provider store={store} key={index}>
                            <MenuItem_container
                                item={item}
                                index={index}
                                display={display}
                            />
                        </Provider>
                    )
                })
            }
        </div>
    )
}