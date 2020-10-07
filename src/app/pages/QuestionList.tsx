import React, { useState, useEffect } from 'react'
import staticQuestionList from 'model/questionList.json'
import { Button } from 'antd'
import BlogHeader from 'app/components/blog/BlogHeader'
import 'app/styles/page/questionList.scss'
import { useHistory } from 'react-router-dom'
import { IconFont, info } from 'app/components/common/config'
import { questionItemConfig } from 'app/components/back/QuestionList'
import Loading2 from 'app/components/common/Loading2'

const stylePrefix = 'page-questionList'

export default function QuestionList() {
    const history = useHistory()
    const [page, setPage] = useState(1)
    const [pageNum, setPageNum] = useState(1)
    const [questionList, setQuestionList] = useState<questionItemConfig[]>([])
    const [loading, setLoading] = useState(false)
    const judgeQuestionNaireStatus = (abortTime: string, startTime: string) => {
        let backgroundColor = '#0f0'
        let text = '进行中'
        if (abortTime < new Date().getTime().toString()) {
            backgroundColor = '#f00'
            text = '已截止'
        }
        if (startTime > new Date().getTime().toString()) {
            backgroundColor = 'yellow'
            text = '未开始'
        }
        return <div
            style={{
                backgroundColor
            }}
            className={`${stylePrefix}-label`}
        >
            {text}
        </div>
    }
    const handleClick = (abortTime: string, startTime: string, id: number) => {
        if (abortTime < new Date().getTime().toString()) {
            info('该问卷已截止')
            return
        }

        if (startTime > new Date().getTime().toString()) {
            info('该问卷未开始')
            return
        }
        history.push(`/question/${id}`)
    }
    const getQuestionList = async () => {
        setLoading(true)
        setTimeout(() => {
            setQuestionList(staticQuestionList.list)
            setPageNum(staticQuestionList.page)
            setLoading(false)
        }, 2000);
    }
    useEffect(() => {
        getQuestionList()
    }, [page])
    return (
        <>
            <BlogHeader activeIndex={2} />
            <div className={`${stylePrefix}-main`}>
                {
                    loading
                        ? <div style={{
                            height: 600,
                            width: '100%'
                        }}>
                            <Loading2 backgroundColor='transparent' />
                        </div>
                        : <>
                            {
                                questionList.map((item, index) => {
                                    return <div
                                        key={index}
                                        className={`${stylePrefix}-basic-info`}
                                    >
                                        {judgeQuestionNaireStatus(item.abortTime, item.startTime)}
                                        <div className={`${stylePrefix}-title`}>{item.title}</div>
                                        <div className={`${stylePrefix}-author`}>{item.author}</div>
                                        <div className={`${stylePrefix}-decoration`}>{item.decoration}</div>
                                        {
                                            item.isWrite
                                                ? <div className={`${stylePrefix}-write-layout`}>
                                                    <IconFont type='anticonicon_gou' className={`${stylePrefix}-icon`} />
                                                    <span>已填写</span>
                                                </div>
                                                : <div className={`${stylePrefix}-btn-write`} >
                                                    <Button
                                                        type="primary"
                                                        shape="round"
                                                        onClick={() => handleClick(item.abortTime, item.startTime, item.id)}
                                                        className={`${stylePrefix}-btn`}
                                                    >
                                                        填写问卷
                                                </Button>
                                                </div>
                                        }
                                    </div>
                                })
                            }
                            <div className={`${stylePrefix}-btn-layout`} >
                                <Button
                                    disabled={page === 1}
                                    onClick={() => setPage(page - 1)}
                                >Previous</Button>
                                <Button
                                    disabled={page === pageNum}
                                    onClick={() => setPage(page + 1)}
                                >Next</Button>
                            </div>
                        </>
                }
            </div>
            <div className={`${stylePrefix}-background`}></div>
        </>
    )
}
