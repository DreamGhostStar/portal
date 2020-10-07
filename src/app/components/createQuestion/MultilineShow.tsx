import React, { useState } from 'react'
import { Input } from 'antd';
import { WriteQuestionInputConfig } from './QuestionContent';
import 'app/styles/createQuestion/commonShow.scss'

const stylePrefix = 'create-common'
const { TextArea } = Input;

export default function MultilineShow({ index, title, handleData, id, isRequired, type }: WriteQuestionInputConfig) {
    const [value, setValue] = useState('')
    const handleChange = (inputValue: string) => {
        handleData(id, inputValue, type)
        setValue(inputValue)
    }
    return (
        <div className={`${stylePrefix}-single-multiline-layout`}>
            <div className={`${stylePrefix}-header`}>
                <span className={`${stylePrefix}-number`}>{`${index + 1}. `}</span>
                <span>{title}</span>
                {
                    isRequired && <span className={`${stylePrefix}-stress-sign`}>
                        *
                    </span>
                }
            </div>
            <TextArea
                rows={5}
                placeholder="写点什么吧"
                className={`${stylePrefix}-single-multiline-input`}
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    )
}