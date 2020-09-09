import React, { useState, useEffect, useRef } from 'react'
import { Select, Tooltip } from 'antd';
import { deepCopy } from '../common/utils';
import { IconFont } from '../common/config';
import 'app/styles/question/common.scss'

const styleCommonPrefix = 'question-common'
const { Option } = Select;

interface EditMultilineConfig {
    item: any,
    handleInputData: any,
    isSubmit: boolean,
    index: number
    setDropIndex: React.Dispatch<React.SetStateAction<number | null>>
    dropIndex: number | null
    swapSubjectItem: (newIndex: number, oldIndex: number) => void
}

export default function EditMultiline({ item, handleInputData, isSubmit, index, setDropIndex, dropIndex, swapSubjectItem }: EditMultilineConfig) {
    const [obj, setObj] = useState(item)
    const [isTitleClick, setIsTitleClick] = useState(false)
    const inputRef = useRef(null)
    const divRef = useRef<HTMLDivElement>(null)
    const handleChange = (value: string) => {
        const tempObj = deepCopy(obj)
        tempObj.isRequired = value === '非必需' ? false : true;
        setObj(tempObj)
    }

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            isRequired: obj.isRequired,
            type: 'multiline',
        })
    }
    // 开始拖动
    const dragStart = () => {
        setDropIndex(index)
    }
    const dragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault()
        event.dataTransfer.dropEffect = 'link'
    }
    const ondrop = () => {
        if (dropIndex != null && dropIndex != index) {
            swapSubjectItem(index, dropIndex)
        }
    }
    useEffect(() => {
        if (isSubmit) {
            handleInputData(obj, index);
        }
    }, [isSubmit])
    return (
        <div
            className={`${styleCommonPrefix}-layout`}
            draggable={true}
            onDragStart={dragStart}
            onDragOver={dragOver}
            onDrop={ondrop}
            ref={divRef}
        >
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
            <div className={`${styleCommonPrefix}-placeholder`}>
                写点什么吧
            </div>
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