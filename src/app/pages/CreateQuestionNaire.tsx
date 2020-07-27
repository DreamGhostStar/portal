import React from 'react'
import Header from '../components/common/Header'
import CreateQuestionContent from '../components/question/CreateQuestionContent'
import 'app/styles/page/createQuestionNaire.scss'

const stylePrefix = 'page-createQuestionNaire'

export default function CreateQuestionNaire() {
    return (
        <>
            <div className={`${stylePrefix}-main`}>
                <Header title='创建问卷' />
                <CreateQuestionContent />
            </div>
            <div className={`${stylePrefix}-background`}></div>
        </>
    )
}