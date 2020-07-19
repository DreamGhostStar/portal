import React, { useState, useEffect } from 'react'
import { Input } from 'antd';
import { WriteQuestionInputConfig } from './QuestionContent';

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
            <Input placeholder='写点什么吧' style={{
                width: 900
            }} onChange={(e) => onChange(e)} />
        </div>
    )
}