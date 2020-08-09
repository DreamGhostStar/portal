import React from 'react'
import Header from '../components/common/Header'
import CreateQuestionContent from '../components/question/CreateQuestionContent'
import 'app/styles/page/createQuestionNaire.scss'
import { useParams } from 'react-router-dom'

const stylePrefix = 'page-createQuestionNaire'

interface paramsConfig {
    id: string
}
export default function CreateQuestionNaire() {
    const params = useParams<paramsConfig>()
    return (
        <>
            <div className={`${stylePrefix}-main`}>
                <Header title='创建问卷' />
                <CreateQuestionContent questionID={Number(params.id) || null} />
            </div>
            <div className={`${stylePrefix}-background`}></div>
        </>
    )
}