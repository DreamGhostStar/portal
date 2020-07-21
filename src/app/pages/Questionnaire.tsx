import React from 'react'
import QuestionContent from '../components/writeQuestion/QuestionContent'
import staticData from 'static/questionContent.json'
import 'app/styles/page/questionnaire.scss'

const stylePrefix = 'page-questionnaire'

export default function Questionnaire() {
    return (
        <>
            <div className={`${stylePrefix}-layout`}>
                <div className={`${stylePrefix}-title`}>
                    {staticData.title}
                </div>
                <div className={`${stylePrefix}-author`}>
                    创作者：{staticData.author}
                </div>
                <QuestionContent questionContent={staticData.content} />
            </div>
            <div className={`${stylePrefix}-background`}>
            </div>
        </>
    )
}