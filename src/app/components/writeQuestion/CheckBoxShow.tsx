import React, { useState, useEffect } from 'react'
import { Checkbox } from 'antd';
import { deepCopy } from '../common/utils';
import { WriteQuestionInputConfig } from './QuestionContent';

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
        <div style={{
            fontSize: 30,
            paddingLeft: 50
        }}>
            <div style={{
                paddingTop: 20,
            }}>
                <span style={{
                    fontWeight: 'bold'
                }}>{`${index + 1}. `}</span>
                <span>{title}</span>
                {
                    isRequired && <span style={{
                        color: '#f00'
                    }}>
                        *
                    </span>
                }
            </div>
            {
                options && options.map((item: any, index: number) => {
                    return (
                        <div key={index} style={{
                            paddingBottom: 10
                        }}>
                            <Checkbox onChange={() => onChange(index)}>{item}</Checkbox>
                        </div>
                    )
                })
            }
        </div>
    )
}