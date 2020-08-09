import React, { useState, useEffect } from 'react'
import questionListModel from 'model/questionList.json'
import 'app/styles/back/questionList.scss'
import Loading2 from '../common/Loading2'
import { Button, Modal } from 'antd'
import { useHistory } from 'react-router-dom'
import Item from 'antd/lib/list/Item'
const stylePrefix = 'back-questionList'
interface questionItemConfig {
    id: number;
    isWrite: boolean;
    title: string;
    author: string;
    decoration: string;
    abortTime: string;
    startTime: string;
}

export default function QuestionList() {
    const history = useHistory()
    const [questionList, setQuestionList] = useState<questionItemConfig[]>([])
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [modalLoading, setModalLoading] = useState(false)
    const [deleteID, setDeleteID] = useState<number | null>(null)
    useEffect(() => {
        getQuestionList()
    }, [])
    const getQuestionList = async () => {
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
            setQuestionList(questionListModel)
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
                    : questionList.map((questionItem, index) => {
                        return <div
                            key={index}
                            className={`${stylePrefix}-question-item`}
                        >
                            <div className={`${stylePrefix}-title`}>{questionItem.title}</div>
                            <div className={`${stylePrefix}-author`}>{questionItem.author}</div>
                            <div className={`${stylePrefix}-decoration`}>{questionItem.decoration}</div>
                            <div className={`${stylePrefix}-btn-layout`}>
                                <Button
                                    type="primary"
                                    shape="round"
                                    onClick={() => history.push(`/editQuestion/${questionItem.id}`)}
                                >
                                    编辑
                                </Button>
                                <Button
                                    danger
                                    type="primary"
                                    shape="round"
                                    onClick={() => { setDeleteID(questionItem.id); setVisible(true) }}
                                >
                                    删除
                                </Button>
                            </div>
                        </div>
                    })
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
