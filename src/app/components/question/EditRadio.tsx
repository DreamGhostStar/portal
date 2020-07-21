import React, { useState, useEffect, useRef } from 'react'
import { Tooltip, Select } from 'antd';
import { deepCopy } from '../common/utils';
import { IconFont } from '../common/config';
import 'app/styles/question/common.scss'
import 'app/styles/question/editRadio.scss'

const styleCommonPrefix = 'question-common'
const styleUniquePrefix = 'question-editRadio'
const { Option } = Select;

interface EditRadioConfig {
    item: any,
    handleInputData: any,
    isSubmit: boolean,
    index: number
}

export default function EditRadio({ item, handleInputData, isSubmit, index }: EditRadioConfig) {
    const [clickIndex, setClickIndex] = useState<number | null>(null)
    const [obj, setObj] = useState(item)
    const [isTitleClick, setIsTitleClick] = useState(false)
    const [isSubmitInThis, setIsSubmitInThis] = useState(false)
    const inputRef = useRef(null)

    const handleChange = (value: string) => {
        const tempObj = deepCopy(obj)

        tempObj.isRequired = value === '非必需' ? false : true;
        setObj(tempObj)
    }
    const onChange = (e: any, optionIndex: number) => {
        const tempObj = deepCopy(obj)
        tempObj.options[optionIndex] = e.target.value;

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
            options: [
                'A',
                'B',
                'C',
                'D'
            ],
            isRequired: obj.isRequired,
            type: 'radio',
        })
    }
    useEffect(() => {
        if (isSubmit && isSubmitInThis === false) {
            handleSubmit(obj, index)
        }
    }, [isSubmit, isSubmitInThis])
    return (
        <div className={`${styleCommonPrefix}-layout`}>
            <div className={`${styleCommonPrefix}-header`}>
                <span className={`${styleCommonPrefix}-number`}>{`${index + 1}. `}</span>
                <input
                    style={{
                        backgroundColor: (isTitleClick ? '#eee' : '#fff'),
                    }}
                    className={`${styleCommonPrefix}-title-input`}
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
            {
                obj.options.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            style={{
                                backgroundColor: (clickIndex === index ? '#eee' : '#fff')
                            }}
                            onClick={() => { setClickIndex(index) }}
                            className={`${styleCommonPrefix}-main-item`}
                        >
                            <div className={`${styleUniquePrefix}-value-input-layout`}></div>
                            <input
                                style={{
                                    backgroundColor: (clickIndex === index ? '#eee' : '#fff')
                                }}
                                className={`${styleCommonPrefix}-value-input`}
                                value={item}
                                onChange={(e) => onChange(e, index)}
                            />
                        </div>
                    )
                })
            }
            <div className={`${styleCommonPrefix}-footer`}>
                <Tooltip title="重置">
                    <IconFont type='anticonzhongzhi' className={`${styleCommonPrefix}-icon`} onClick={handleReset} />
                </Tooltip>
                <Tooltip title="删除">
                    <IconFont type='anticoncha' className={`${styleCommonPrefix}-icon`} />
                </Tooltip>
            </div>
        </div>
    )
}