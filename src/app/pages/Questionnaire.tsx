import React, { useEffect, useState } from 'react'
import QuestionContent from '../components/createQuestion/QuestionContent'
import 'app/styles/page/questionnaire.scss'
import { optionItemConfig } from './Question'
import { get_question_content_api } from 'app/http/question'
import { isSuccess } from 'app/components/common/utils'
import { error } from 'app/components/common/config'
import Loading2 from 'app/components/common/Loading2'

const stylePrefix = 'page-questionnaire'

export interface textConfig {
    id: number;
    title: string;
    isRequired: boolean;
    type: string;
    options?: undefined;
}

export interface radioCheckConfig {
    id: number;
    title: string;
    options: optionItemConfig[];
    isRequired: boolean;
    type: string;
}

export default function Questionnaire({ questionID }: { questionID: number }) {
    const [question, setQuestion] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const getQuestionNaireContent = async () => {
        setLoading(true)
        const res = await get_question_content_api({ id: questionID })
        if (isSuccess(res.code)) {
            setQuestion(res.data)
        } else {
            error(res.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        getQuestionNaireContent()
    }, [questionID])
    return (
        <>
            {
                !loading && question
                    ? <>
                        <div className={`${stylePrefix}-layout`}>
                            <div className={`${stylePrefix}-title`}>
                                {question.title}
                            </div>
                            <div className={`${stylePrefix}-author`}>
                                创作者：{question.author}
                            </div>
                            <QuestionContent
                                questionContent={question.content}
                                id={questionID}
                            />
                        </div>
                        <div className={`${stylePrefix}-background`}>
                        </div>
                    </>
                    : <div style={{
                        height: 600,
                        width: '100%'
                    }}>
                        <Loading2 backgroundColor='transparent' />
                    </div>
            }
        </>
    )
}