import React, { useState } from 'react'
import { Radio } from 'antd';
import { WriteQuestionInputConfig } from './QuestionContent';
import 'app/styles/createQuestion/commonShow.scss'

const stylePrefix = 'create-common'

export default function RadioShow({ index, title, options, handleData, id, isRequired, type }: WriteQuestionInputConfig) {
    const [value, setValue] = useState<string | null>(null)
    const onChange = (radioValue: string) => {
        handleData(id, radioValue, type)
        setValue(radioValue)
    };
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
            <Radio.Group onChange={(e)=>{onChange(e.target.value)}} value={value}>
                {
                    options && options.map((item, index) => {
                        return (
                            <div key={index} className={`${stylePrefix}-radio-item`}>
                                <Radio value={item.id}>{item.value}</Radio>
                            </div>
                        )
                    })
                }
            </Radio.Group>
        </div>
    )
}