import React from 'react'
import { useParams } from 'react-router-dom';
import QuestionList from 'app/pages/QuestionList';
import CreateQuestionNaire from './CreateQuestionNaire';
import Questionnaire from './Questionnaire';

interface paramsConfig {
    type: string
}

export interface optionItemConfig {
    id: number
    value: string
}

export default function Question() {
    const params = useParams<paramsConfig>();
    const judgeShow = () => {
        if (params.type === 'list') {
            return <QuestionList />
        } else {
            return <Questionnaire questionID={Number(params.type)} />
        }
    }
    return (
        <>
            {
                judgeShow()
            }
        </>
    )
}
