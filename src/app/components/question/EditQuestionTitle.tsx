import React from 'react'
import 'app/styles/question/editQuestionTitle.scss'

const stylePrefix = 'question-editQuestionTitle'

interface EditQuestionTitleConfig {
    handleChange: any
    title: string
}

export default function EditQuestionTitle({ handleChange, title }: EditQuestionTitleConfig) {
    const onChange = (e: any) => {
        handleChange(e);
    }
    return (
        <input className={`${stylePrefix}-main`} value={title} onChange={(e) => onChange(e)} />
    )
}