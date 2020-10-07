import React from 'react'
import QuestionContent from '../components/createQuestion/QuestionContent'
import staticData from 'model/questionContent.json'
import 'app/styles/page/questionnaire.scss'
import { optionItemConfig } from './Question'

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