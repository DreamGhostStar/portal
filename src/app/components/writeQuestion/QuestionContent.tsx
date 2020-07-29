import React, { useState } from 'react'
import RadioShow from './RadioShow';
import CheckBoxShow from './CheckBoxShow';
import MultilineShow from './MultilineShow';
import { Button } from 'antd';
import { deepCopy } from '../common/utils';
import 'app/styles/createQuestion/questionContent.scss'
import { optionItemConfig } from 'app/pages/Question';
import { textConfig, radioCheckConfig } from 'app/pages/Questionnaire';

const stylePrefix = 'create-questionContent'

interface QuestionContentConfig {
    questionContent: (textConfig | radioCheckConfig)[]
}

export interface WriteQuestionInputConfig {
    index: number,
    title: string,
    options?: optionItemConfig[],
    isSubmit: boolean,
    handleData: any,
    id: number,
    isRequired: boolean
}

export default function QuestionContent({ questionContent }: QuestionContentConfig) {
    const [isSubmit, setIsSubmit] = useState(false)
    const [questionResult, setQuestionResult] = useState([])

    const handleData = (id: number, value: string) => {
        let temp = {
            id: id,
            value: value
        }

        const tempQuestionResult = deepCopy(questionResult)

        for (let index = 0; index < tempQuestionResult.length; index++) {
            const element = tempQuestionResult[index];
            if (element.id === id) {
                return;
            }
        }

        tempQuestionResult.push(temp);
        setQuestionResult(tempQuestionResult)
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                // 判断渲染各基本组件
                questionContent.map((item, index) => {
                    var temp;
                    switch (item.type) {
                        case 'radio':
                            temp = <RadioShow
                                key={index}
                                index={index}
                                id={item.id}
                                title={item.title}
                                options={item.options}
                                isRequired={item.isRequired}
                                isSubmit={isSubmit}
                                handleData={handleData}
                            />
                            break;
                        case 'checkBox':
                            temp = <CheckBoxShow
                                key={index}
                                index={index}
                                id={item.id}
                                title={item.title}
                                options={item.options}
                                isRequired={item.isRequired}
                                isSubmit={isSubmit}
                                handleData={handleData}
                            />
                            break;
                        case 'text':
                            temp = <MultilineShow
                                key={index}
                                index={index}
                                id={item.id}
                                title={item.title}
                                isRequired={item.isRequired}
                                isSubmit={isSubmit}
                                handleData={handleData}
                            />
                            break;
                        default:
                    }

                    return temp;
                })
            }
            <Button type="primary" className={`${stylePrefix}-btn`} onClick={() => { setIsSubmit(true) }}>提交</Button>
        </div>
    )
}