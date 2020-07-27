import React from 'react'
import { useParams } from 'react-router-dom';
import QuestionList from 'app/pages/QuestionList';
import CreateQuestionNaire from './CreateQuestionNaire';
import Questionnaire from './Questionnaire';

interface paramsConfig {
    type: string
}

export default function Question() {
    const params = useParams<paramsConfig>();
    const judgeShow = () => {
        const contrast = {
            list: <QuestionList />,
            create: <CreateQuestionNaire />,
            edit: <Questionnaire />
        }
        return contrast[params.type]
    }
    return (
        <>
            {
                judgeShow()
            }
        </>
    )
}
