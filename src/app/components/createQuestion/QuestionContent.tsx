import React, { useState, useEffect } from 'react'
import RadioShow from './RadioShow';
import CheckBoxShow from './CheckBoxShow';
import MultilineShow from './MultilineShow';
import { Button } from 'antd';
import { deepCopy, isSuccess } from '../common/utils';
import 'app/styles/createQuestion/questionContent.scss'
import { optionItemConfig } from 'app/pages/Question';
import { textConfig, radioCheckConfig } from 'app/pages/Questionnaire';
import { error, success } from '../common/config';
import { submit_question_api } from 'app/http/question';
import { useHistory } from 'react-router-dom';

const stylePrefix = 'create-questionContent'

interface QuestionContentConfig {
    questionContent: (textConfig | radioCheckConfig)[]
    id: number;
}

export interface WriteQuestionInputConfig {
    index: number,
    title: string,
    options?: optionItemConfig[],
    handleData: HandleDataConfig,
    id: number,
    isRequired: boolean
    type: string
}

interface questionResultConfig {
    id: number
    type: string
    radioValue?: number
    checkBoxValue?: number[]
    textValue?: string
}

export interface HandleDataConfig {
    (id: number, value: string, type: string): void
}

interface verifyConfig {
    id: number
    order: number
    result: boolean
}

export default function QuestionContent({ questionContent, id }: QuestionContentConfig) {
    const [questionResult, setQuestionResult] = useState<questionResultConfig[]>([])
    const [verify, setVerify] = useState<verifyConfig[]>([])
    const history = useHistory()

    const handleData: HandleDataConfig = (id, value, type) => {
        const contrast = {
            radio: 'radioValue',
            checkBox: 'checkBoxValue',
            text: 'textValue'
        }

        const tempQuestionResult: questionResultConfig[] = deepCopy(questionResult)

        if (value) {
            const tempVerify: verifyConfig[] = deepCopy(verify)
            tempVerify.forEach(verifyItem => {
                if (id === verifyItem.id) {
                    verifyItem.result = true
                }
            });
            setVerify(tempVerify)
        }

        for (let index = 0; index < tempQuestionResult.length; index++) {
            if (tempQuestionResult[index].id === id) {
                tempQuestionResult[index][contrast[type]] = value
                setQuestionResult(tempQuestionResult)
                return;
            }
        }

        let temp: questionResultConfig = {
            id,
            type,
            [contrast[type]]: value,
        }
        tempQuestionResult.push(temp);
        setQuestionResult(tempQuestionResult)
    }
    // 提交问卷
    const handleSubmit = async () => {
        for (let index = 0; index < verify.length; index++) {
            const verifyItem = verify[index];
            if (!verifyItem.result) {
                error(`第${verifyItem.order + 1}题不能为空`)
                return
            }
        }
        const res = await submit_question_api({
            id: id,
            values: questionResult
        })
        if (isSuccess(res.code)) {
            success('提交问卷成功')
            history.goBack()
        } else {
            error(res.message)
        }
    }
    useEffect(() => {
        const tempVerify: verifyConfig[] = [];
        questionContent.map((item, index) => {
            if (item.isRequired) {
                const verifyItem = {
                    id: item.id,
                    order: index,
                    result: false
                }
                tempVerify.push(verifyItem)
            }
        })
        setVerify(tempVerify)
    }, [])
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
                                handleData={handleData}
                                type={item.type}
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
                                handleData={handleData}
                                type={item.type}
                            />
                            break;
                        case 'text':
                            temp = <MultilineShow
                                key={index}
                                index={index}
                                id={item.id}
                                title={item.title}
                                isRequired={item.isRequired}
                                handleData={handleData}
                                type={item.type}
                            />
                            break;
                        default:
                    }

                    return temp;
                })
            }
            <Button
                type="primary"
                className={`${stylePrefix}-btn`}
                onClick={handleSubmit}
            >提交</Button>
        </div>
    )
}