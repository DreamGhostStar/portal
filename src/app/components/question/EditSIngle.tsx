import React, { useState, useRef, useEffect } from 'react';
import { Select, Tooltip } from 'antd';
import { deepCopy } from '../common/utils';
import { IconFont } from '../common/config';

const { Option } = Select;
interface EditSIngleConfig {
    item: any,
    handleInputData: any,
    isSubmit: boolean,
    index: number
}

export default function EditSIngle({ item, handleInputData, isSubmit, index }: EditSIngleConfig) {
    const [obj, setObj] = useState(item)
    const [isTitleClick, setIsTitleClick] = useState(false)
    const [isSubmitInThis, setIsSubmitInThis] = useState(false)
    const inputRef = useRef(null)

    const handleChange = (value: string) => {
        const tempObj = deepCopy(obj)

        tempObj.isRequired = value === '非必需' ? false : true;
        setObj(tempObj)
    }
    const handleTitleChange = (e: any) => {
        let value = e.target.value;
        let length = value.length;
        (inputRef.current as any).style.width = length * 30 + 20 + 'px';

        const tempObj = deepCopy(obj)
        tempObj.title = e.target.value;
        setObj(tempObj)
    }

    // 在点击发布时，该组件向createQuestionContent组件传递信息
    const handleSubmit = (obj: any, index: number) => {
        if (isSubmitInThis === false) {
            handleInputData(obj, index);
        }

        setIsSubmitInThis(true)
    }

    // 重置
    const handleReset = () => {
        setObj({
            index: obj.index,
            title: '标题',
            isRequired: obj.isRequired,
            type: 'singleText',
        })
    }
    useEffect(() => {
        if (isSubmit && isSubmitInThis === false) {
            handleSubmit(obj, index)
        }
    }, [isSubmit, isSubmitInThis])
    return (
        <div style={{
            fontSize: 30,
            paddingLeft: 50,
            paddingBottom: 50,
            position: 'relative'
        }}>
            <div style={{
                paddingTop: 20,
                paddingBottom: 20
            }}>
                <span style={{
                    fontWeight: 'bold'
                }}>{`${index + 1}. `}</span>
                <input
                    style={{
                        backgroundColor: (isTitleClick ? '#eee' : '#fff'),
                        outline: 'none',
                        border: 'none',
                        width: 80
                    }}
                    onClick={() => { setIsTitleClick(true) }}
                    value={obj.title}
                    onChange={(e) => handleTitleChange(e)}
                    ref={inputRef}
                    onBlur={() => { setIsTitleClick(false) }}
                />
                <Select defaultValue="非必填" style={{ width: 120, marginLeft: 20 }} onChange={handleChange}>
                    <Option value='非必填'>非必填</Option>
                    <Option value='必填'>必填</Option>
                </Select>
            </div>
            <div style={{
                border: '1px solid #ccc',
                height: 30,
                width: 900,
                color: '#ccc',
                borderRadius: 5,
                fontSize: 14,
                paddingLeft: 20,
                lineHeight: '30px'
            }}>
                写点什么吧
            </div>
            <div style={{
                width: 100,
                display: 'flex',
                justifyContent: 'space-between',
                position: 'absolute',
                right: 0,
                marginRight: 40
            }}>
                <Tooltip title="重置">
                    <IconFont type='anticonzhongzhi' style={{
                        color: '#ccc'
                    }} onClick={handleReset} />
                </Tooltip>
                <Tooltip title="删除">
                    <IconFont type='anticoncha' style={{
                        color: '#ccc'
                    }} />
                </Tooltip>
            </div>
        </div>
    )
}