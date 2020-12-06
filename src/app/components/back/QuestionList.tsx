import React, { useState, useEffect } from 'react'
import 'app/styles/back/questionList.scss'
import Loading2 from '../common/Loading2'
import { Button, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { error, IconFont, success } from '../common/config'
import { isSuccess, simpleFormatTime } from '../common/utils'
import { delete_question_template_api, get_question_list_api } from 'app/http/question'
const stylePrefix = 'back-questionList'
export interface questionItemConfig {
    id: number;
    isWrite: boolean;
    title: string;
    author: string;
    decoration: string;
    abortTime: string;
    startTime: string;
    num: string;
}

export default function QuestionList() {
    const history = useHistory()
    const [questionList, setQuestionList] = useState<questionItemConfig[]>([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [deleteID, setDeleteID] = useState<number | null>(null)
    const [page, setPage] = useState(1)
    const [pageNum, setPageNum] = useState(1)
    useEffect(() => {
        getQuestionList()
    }, [page])
    const getQuestionList = async () => {
        setLoading(true)
        const res = await get_question_list_api({ page: page })
        if (isSuccess(res.code)) {
            setQuestionList(res.data.list)
            setPageNum(res.data.page)
        } else {
            error(res.message)
        }
        setLoading(false)
    }
    // 删除问卷样板
    const handleOk = async () => {
        if (deleteID === null) {
            return
        }
        setModalLoading(true)
        const res = await delete_question_template_api({ id: deleteID })
        if (isSuccess(res.code)) {
            success('删除成功')
        } else {
            error(res.message)
        }
        setVisible(false)
        setModalLoading(false)
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                loading
                    ? <div className={`${stylePrefix}-loading-layout`}>
                        <Loading2 backgroundColor='#eee' />
                    </div>
                    : <>
                        {
                            questionList.map((questionItem, index) => {
                                return (
                                    <div
                                        key={index}
                                        className={`${stylePrefix}-question-item`}
                                    >
                                        <div className={`${stylePrefix}-header-layout`} >
                                            <p className={`${stylePrefix}-num`} >提交人数：{questionItem.num}</p>
                                            <div className={`${stylePrefix}-info`} >
                                                <p className={`${stylePrefix}-title`}>{questionItem.title}</p>
                                                <p className={`${stylePrefix}-author`}>{questionItem.author}</p>
                                            </div>
                                            <div className={`${stylePrefix}-btn-layout`}>
                                                <IconFont
                                                    type='anticonchakan'
                                                    className={`${stylePrefix}-icon`}
                                                    onClick={() => history.push(`/editQuestion/${questionItem.id}`)}
                                                />
                                                <IconFont
                                                    type='anticonxiugai'
                                                    className={`${stylePrefix}-icon`}
                                                    onClick={() => history.push(`/editQuestion/${questionItem.id}`)}
                                                />
                                                <IconFont
                                                    type='anticonshanchu'
                                                    className={`${stylePrefix}-icon`}
                                                    onClick={() => { setDeleteID(questionItem.id); setVisible(true) }}
                                                />
                                            </div>
                                        </div>
                                        <div className={`${stylePrefix}-decoration`}>{questionItem.decoration}</div>
                                        <p className={`${stylePrefix}-time`} >
                                            时间：{simpleFormatTime(questionItem.startTime)} - {simpleFormatTime(questionItem.abortTime)}
                                        </p>
                                    </div>
                                )
                            })
                        }
                        <div className={`${stylePrefix}-page-btn-layout`} >
                            <Button
                                size='large'
                                onClick={() => setPage(page - 1)}
                                disabled={page === 1}
                            >Previous</Button>
                            <Button
                                size='large'
                                onClick={() => setPage(page + 1)}
                                disabled={page === pageNum}
                            >Next</Button>
                        </div>
                    </>
            }
            <Modal
                visible={visible}
                title="提示"
                onOk={handleOk}
                onCancel={() => setVisible(false)}
                footer={[
                    <Button key="back" onClick={() => setVisible(false)}>
                        返回
                    </Button>,
                    <Button key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
                        确认
                    </Button>,
                ]}
            >
                <p>确认要删除该问卷吗</p>
            </Modal>
        </div>
    )
}
