import React from 'react'
import questionList from 'model/questionList.json'
import { Button } from 'antd'
import BlogHeader from 'app/components/blog/BlogHeader'
import 'app/styles/page/questionList.scss'
import { useHistory } from 'react-router-dom'

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
    const handleClick = (isWrite: boolean) => {
        const path = isWrite ? 'edit' : 'create'
        history.push(`/question/${path}`)
    }
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
                            <div className={`${stylePrefix}-title`}>{item.title}</div>
                            <div className={`${stylePrefix}-author`}>{item.author}</div>
                            <div className={`${stylePrefix}-decoration`}>{item.decoration}</div>
                            <Button
                                type="primary"
                                shape="round"
                                onClick={() => handleClick(item.isWrite)}
                                className={`${stylePrefix}-btn`}
                            >
                                {item.isWrite ? '编辑问卷' : '新建问卷'}
                            </Button>
                        </div>
                    })
                }
            </div>
            <div className={`${stylePrefix}-background`}></div>
        </>
    )
}
