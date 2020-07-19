import React from 'react'

interface EditQuestionTitleConfig {
    handleChange: any
}

export default function EditQuestionTitle({ handleChange }: EditQuestionTitleConfig) {
    const onChange = (e: any) => {
        handleChange(e);
    }
    return (
        <input style={{
            textAlign: 'center',
            fontSize: 24,
            paddingTop: 20,
            paddingBottom: 20,
            backgroundColor: '#fff',
            height: 30,
            width: 1200,
            outline: 'none',
            border: 'none',
            boxShadow: '0 2px 4px 0 rgba(0,0,0,.1)'
        }} defaultValue='问卷题目' onChange={(e) => onChange(e)} />
    )
}