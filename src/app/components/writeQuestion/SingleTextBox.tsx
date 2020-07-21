import React, { useState, useEffect } from 'react'
import { Input } from 'antd';
import { WriteQuestionInputConfig } from './QuestionContent';
import 'app/styles/createQuestion/commonShow.scss'

const stylePrefix = 'create-common'

export default function SingleTextBox({ index, title, isSubmit, handleData, id, isRequired }: WriteQuestionInputConfig) {
    const [value, setValue] = useState('')
    const onChange = (e: any) => {
        setValue(e.target.value)
    };
    useEffect(() => {
        if (isSubmit) {
            handleData(id, value)
        }
    }, [isSubmit])
    return (
        <div className={`${stylePrefix}-single-multiline-layout`}>
            <div className={`${stylePrefix}-header`}>
                <span className={`${stylePrefix}-header`}>{`${index + 1}. `}</span>
                <span>{title}</span>
                {
                    isRequired && <span className={`${stylePrefix}-stress-sign`}>
                        *
                    </span>
                }
            </div>
            <Input
                placeholder='写点什么吧'
                className={`${stylePrefix}-single-multiline-input`}
                onChange={(e) => onChange(e)}
            />
        </div>
    )
}