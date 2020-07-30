import React, { useState } from 'react'
import { Checkbox } from 'antd';
import { deepCopy } from '../common/utils';
import { WriteQuestionInputConfig } from './QuestionContent';
import 'app/styles/createQuestion/commonShow.scss'
import 'app/styles/createQuestion/checkBoxShow.scss'

const stylePrefix = 'create-common'
const styleUniquePrefix = 'create-checkBox'

export default function CheckBoxShow({ index, title, options, handleData, id, isRequired, type }: WriteQuestionInputConfig) {
    const [value, setValue] = useState<any[]>([])
    const onChange = (optionID: number) => {
        const tempValue = deepCopy(value)
        if (tempValue.indexOf(optionID) === -1) {
            tempValue.push(optionID);

            setValue(tempValue)
        } else {
            tempValue.splice(optionID, 1);
        }
        handleData(id, tempValue, type)
    }
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
                options && options.map((item, index) => {
                    return (
                        <div key={index} className={`${styleUniquePrefix}-check-item`}>
                            <Checkbox onChange={() => onChange(item.id)}>{item.value}</Checkbox>
                        </div>
                    )
                })
            }
        </div>
    )
}