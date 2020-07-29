import React, { useState, useEffect } from 'react'
import { Radio } from 'antd';
import { WriteQuestionInputConfig } from './QuestionContent';
import 'app/styles/createQuestion/commonShow.scss'

const stylePrefix = 'create-common'

export default function RadioShow({ index, title, options, isSubmit, handleData, id, isRequired }: WriteQuestionInputConfig) {
    const [value, setValue] = useState(null)
    const onChange = (e: any) => {
        setValue(e.target.value)
    };
    useEffect(() => {
        if (isSubmit) {
            handleData(id, value)
        }
    }, [isSubmit])
    return (
        <div className={`${stylePrefix}-radio-check-layout`}>
            <div className={`${stylePrefix}-header`}>
                <span className={`${stylePrefix}-number`}>{`${index + 1}. `}</span>
                <span>{title}</span>
                {
                    isRequired && <span className={`${stylePrefix}-stress-sign`}>
                        *
                    </span>
                }
            </div>
            <Radio.Group onChange={onChange} value={value}>
                {
                    options && options.map((item, index) => {
                        return (
                            <div key={index} className={`${stylePrefix}-radio-item`}>
                                <Radio value={index}>{item.value}</Radio>
                            </div>
                        )
                    })
                }
            </Radio.Group>
        </div>
    )
}