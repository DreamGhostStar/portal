import React, { useState, useRef, useEffect, Fragment } from 'react'
import { Select, Tooltip } from 'antd';
import { deepCopy } from '../common/utils';
import { IconFont } from '../common/config';
import 'app/styles/question/common.scss'
import { subjectItemConfig, optionDefault } from './CreateQuestionContent';

const styleCommonPrefix = 'question-common'
const { Option } = Select;

interface EditCheckBoxConfig {
    subjectItem: subjectItemConfig,
    handleInputData: any,
    isSubmit: boolean,
    index: number
}

export default function EditCheckBox({ subjectItem, handleInputData, isSubmit, index }: EditCheckBoxConfig) {
    const [clickIndex, setClickIndex] = useState<number | null>(null)
    const [obj, setObj] = useState<subjectItemConfig>(subjectItem)
    const [isTitleClick, setIsTitleClick] = useState(false)
    const [mouseIndex, setMouseIndex] = useState<number | null>(null)
    const inputRef = useRef(null)

    // 增加选项
    const addOption = (index: number) => {
        const tempObj: subjectItemConfig = deepCopy(obj)
        tempObj.options.splice(index + 1, 0, {
            id: 5,
            value: '请输入选项'
        })

        setObj(tempObj)
    }
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
    // 重置
    const handleReset = () => {
        setObj({
            index: obj.index,
            title: '标题',
            options: optionDefault,
            isRequired: obj.isRequired,
            type: 'checkBox',
        })
    }
    useEffect(() => {
        if (isSubmit) {
            handleInputData(obj, index);
        }
    }, [isSubmit])
    return (
        <div
            className={`${styleCommonPrefix}-layout`}
            onMouseLeave={() => setMouseIndex(null)}
        >
            <div className={`${styleCommonPrefix}-header`}>
                <span className={`${styleCommonPrefix}-number`}>{`${obj.index + 1}. `}</span>
                <input
                    style={{
                        backgroundColor: (isTitleClick ? '#eee' : '#fff'),
                    }}
                    className={`${styleCommonPrefix}-title-input `}
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
                obj.options.map((item, index) => {
                    return (
                        <Fragment key={index}>
                            <div
                                style={{
                                    backgroundColor: (clickIndex === index ? '#eee' : '#fff')
                                }}
                                className={`${styleCommonPrefix}-main-item`}
                                onClick={() => setClickIndex(index)}
                                onMouseOver={() => setMouseIndex(index)}
                            >
                                <div
                                    style={{
                                        borderRadius: subjectItem.type === 'radio' ? '50%' : 3
                                    }}
                                    className={`${styleCommonPrefix}-prefix`}></div>
                                <input
                                    style={{
                                        backgroundColor: (clickIndex === index ? '#eee' : '#fff')
                                    }}
                                    className={`${styleCommonPrefix}-value-input`}
                                    onChange={(e) => onChange(e, index)}
                                    value={item.value}
                                />
                            </div>
                            <div
                                className={`${styleCommonPrefix}-add-item`}
                                style={{
                                    display: ((mouseIndex !== null && mouseIndex === index) ? 'block' : 'none')
                                }}
                            >
                                <IconFont
                                    type='anticonjia1'
                                    className={`${styleCommonPrefix}-add-item-icon`}
                                    onClick={() => addOption(index)}
                                />
                            </div>
                        </Fragment>
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