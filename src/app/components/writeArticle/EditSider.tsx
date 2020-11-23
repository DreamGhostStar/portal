import React, { useState, useRef } from 'react'
import '../../styles/edit/editSider.scss'
import SelectInput from './SelectInput'
import Driver from '../common/Driver'
import { Input } from 'antd';

const { TextArea } = Input;

interface EditSiderConfig {
    handleClick: any
    abstract: string
    setArticleAbStract: any
}

export default function EditSider({ handleClick, abstract, setArticleAbStract }: EditSiderConfig) {
    const [type, setType] = useState(0)
    const textAreaRef = useRef(null)
    const handleInput = (event: any) => {
        if (event && event.target) {
            setArticleAbStract((event.target as any).value)
        }
    }
    return (
        <div className='editSider'>
            <p className='editSider_label'>文章类别选择</p>
            <SelectInput handleSelectType={(tempType: number) => setType(tempType)} />
            <div className='editSider_textArea'>
                <p className='editSider_label'>文章摘要</p>
                <TextArea
                    rows={4}
                    value={abstract}
                    placeholder='摘要（可选）'
                    ref={textAreaRef}
                    onChange={handleInput}
                />
            </div>
            <div className='editSider_button_layout' >
                <button
                    className='editSider_button'
                    onClick={() => handleClick(type, (textAreaRef.current as any).state.value)}
                >提交</button>
            </div>
        </div>
    )
}