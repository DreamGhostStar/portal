import React, { useState, useEffect } from 'react'
import { Input } from 'antd';
import { WriteQuestionInputConfig } from './QuestionContent';

const { TextArea } = Input;

export default function MultilineShow({ index, title, isSubmit, handleData, id, isRequired }: WriteQuestionInputConfig) {
    const [value, setValue] = useState('')
    const handleChange = (e: any) => {
        let value = e.target.value;
        setValue(e.target.value)
    }
    useEffect(() => {
        if (isSubmit) {
            handleData(id, value)
        }
    }, [isSubmit])
    return (
        <div style={{
            fontSize: 30,
            paddingLeft: 50,
            paddingBottom: 50
        }}>
            <div style={{
                paddingTop: 20,
                paddingBottom: 20
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
            <TextArea rows={5} placeholder="写点什么吧" style={{
                width: 900
            }} onChange={(e) => handleChange(e)} />
        </div>
    )
}