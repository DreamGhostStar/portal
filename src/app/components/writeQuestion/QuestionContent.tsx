import React, { useState } from 'react'
import RadioShow from './RadioShow';
import CheckBoxShow from './CheckBoxShow';
import SingleTextBox from './SingleTextBox';
import MultilineShow from './MultilineShow';
import { Button } from 'antd';
import { deepCopy } from '../common/utils';

interface QuestionContentConfig {
    questionContent: any
}

export interface WriteQuestionInputConfig {
    index: number, 
    title: string, 
    options?: any[], 
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
        <div style={{
            backgroundColor: '#efe',
            width: 1200,
            margin: '0 auto'
        }}>
            {
                // 判断渲染各基本组件
                questionContent.map((item: any, index: number) => {
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
                        case 'singleText':
                            temp = <SingleTextBox
                                key={index}
                                index={index}
                                id={item.id}
                                title={item.title}
                                isRequired={item.isRequired}
                                isSubmit={isSubmit}
                                handleData={handleData}
                            />
                            break;
                        case 'multiline':
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
            <Button type="primary" style={{
                width: 100,
                height: 40,
                position: 'relative',
                left: '50%',
                marginLeft: -50,
                marginBottom: 50
            }} onClick={() => { setIsSubmit(true) }}>提交</Button>
        </div>
    )
}