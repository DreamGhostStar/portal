import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd';
import { deepCopy } from '../common/utils';
import { WriteQuestionInputConfig } from './QuestionContent';
import 'app/styles/createQuestion/commonShow.scss'
import 'app/styles/createQuestion/checkBoxShow.scss'

const stylePrefix = 'create-common'
const styleUniquePrefix = 'create-checkBox'

export default function CheckBoxShow({ index, title, options, isSubmit, handleData, id, isRequired }: WriteQuestionInputConfig) {
    const [value, setValue] = useState<any[]>([])
    const onChange = (index: number) => {
        const tempValue = deepCopy(value)
        if (tempValue.indexOf(index) === -1) {
            tempValue.push(index);

            setValue(tempValue)
        } else {
            tempValue.splice(index, 1);
        }
    }
    useEffect(() => {
        if (isSubmit) {
            handleData(id, value)
        }
    }, [isSubmit])
    return (
        <div className={`${stylePrefix}-radio-check-layout`}>
            <div className={`${styleUniquePrefix}-header`}>
                <span className={`${styleUniquePrefix}-number`}>{`${index + 1}. `}</span>
                <span>{title}</span>
                {
                    isRequired && <span className={`${styleUniquePrefix}-stress-sign`}>
                        *
                    </span>
                }
            </div>
            {
                options && options.map((item: any, index: number) => {
                    return (
                        <div key={index} className={`${styleUniquePrefix}-check-item`}>
                            <Checkbox onChange={() => onChange(index)}>{item}</Checkbox>
                        </div>
                    )
                })
            }
        </div>
    )
}