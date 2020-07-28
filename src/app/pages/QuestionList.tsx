import React from 'react'
import questionList from 'model/questionList.json'
import { Button } from 'antd'
import BlogHeader from 'app/components/blog/BlogHeader'
import 'app/styles/page/questionList.scss'
import { useHistory } from 'react-router-dom'
import { IconFont, error } from 'app/components/common/config'

const stylePrefix = 'page-questionList'

interface basicQuestionInfo {
    id: number;
    title: string;
    author: string;
    decoration: string;
    isWrite: boolean;
}

export default function QuestionList() {
    const history = useHistory()
    const handleClick = (isWrite: boolean, abortTime: string) => {
        if (abortTime > new Date().getTime().toString()) {
            error('该问卷已截止')
            return
        }
        const path = isWrite ? 'edit' : 'create'
        history.push(`/question/${path}`)
    }
    console.log(new Date().getTime())
    return (
        <>
            <BlogHeader activeIndex={2} />
            <div className={`${stylePrefix}-main`}>
                {
                    questionList.map((item, index) => {
                        return <div
                            key={index}
                            className={`${stylePrefix}-basic-info`}
                        >
                            {
                                item.abortTime > new Date().getTime().toString()
                                    ? <div className={`${stylePrefix}-error-label ${stylePrefix}-label`}>已截止</div>
                                    : <div className={`${stylePrefix}-success-label ${stylePrefix}-label`}>进行中</div>
                            }
                            <div className={`${stylePrefix}-title`}>{item.title}</div>
                            <div className={`${stylePrefix}-author`}>{item.author}</div>
                            <div className={`${stylePrefix}-decoration`}>{item.decoration}</div>
                            {
                                item.isWrite
                                    ? <div className={`${stylePrefix}-write-layout`}>
                                        <IconFont type='anticonicon_gou' className={`${stylePrefix}-icon`} />
                                        <span>已填写</span>
                                    </div>
                                    : <Button
                                        type="primary"
                                        shape="round"
                                        onClick={() => handleClick(item.isWrite, item.abortTime)}
                                        className={`${stylePrefix}-btn`}
                                    >
                                        新建问卷
                                </Button>
                            }
                        </div>
                    })
                }
            </div>
            <div className={`${stylePrefix}-background`}></div>
        </>
    )
}
