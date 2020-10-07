import React, { useState, useEffect } from 'react'
import questionListModel from 'model/questionList.json'
import 'app/styles/back/questionList.scss'
import Loading2 from '../common/Loading2'
import { Button, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import { IconFont } from '../common/config'
import { simpleFormatTime } from '../common/utils'
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
        setTimeout(() => {
            setLoading(false)
            console.log(page);
            setQuestionList(questionListModel.list)
            setPageNum(questionListModel.page)
        }, 1000);
    }
    const handleOk = () => {
        setModalLoading(true)
        setTimeout(() => {
            console.log(deleteID)
            setVisible(false)
            setModalLoading(false)
        }, 1000);
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
