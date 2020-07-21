import React from 'react'
import 'app/styles/question/editQuestionTitle.scss'

const stylePrefix = 'question-editQuestionTitle'

interface EditQuestionTitleConfig {
    handleChange: any
}

export default function EditQuestionTitle({ handleChange }: EditQuestionTitleConfig) {
    const onChange = (e: any) => {
        handleChange(e);
    }
    return (
        <input className={`${stylePrefix}-main`} defaultValue='问卷题目' onChange={(e) => onChange(e)} />
    )
}