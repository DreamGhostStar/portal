import React, { useState, useEffect } from 'react'
import 'app/styles/back/activityDetail.scss'
import staticActivity from 'model/articleDetail.json'
import Loading2 from '../common/Loading2'
import 'app/styles/blog/markdown.scss'
import marked from 'marked'
import { error, IconFont, success } from '../common/config'
import { useHistory } from 'react-router-dom'
import { Modal, Button } from 'antd'
import { delete_blog_api, get_blog_detail_api } from 'app/http/blog'
import { isSuccess } from '../common/utils'

const stylePrefix = 'back-activityDetail'

interface ActivityDetailConfig {
    id: number
}

interface activityConfig {
    author: string;
    title: string;
    content: string;
    createTime: string;
    updateTime: string;
    deleteTime: string;
    avator: string;
    abstract: string;
}

export default function ActivityDetail({ id }: ActivityDetailConfig) {
    const history = useHistory()
    const [activity, setActivity] = useState<activityConfig | null>(null)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    useEffect(() => {
        getDetailActivity()
    }, [])
    const handleCancel = () => {
        setVisible(false)
    }
    const handleOk = async () => {
        setConfirmLoading(true)
        const res = await delete_blog_api({ articleID: id });
        if (isSuccess(res.code)) {
            success('删除成功')
            history.goBack()
        } else {
            error(res.message)
        }
        setVisible(false)
        setConfirmLoading(false)
    }
    // 获取文章具体信息
    const getDetailActivity = async () => {
        setLoading(true)
        const res = await get_blog_detail_api({ articleID: id })
        if (isSuccess(res.code)) {
            setActivity(res.data)
        } else {
            error(res.message)
        }
        setLoading(false)
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                loading
                    ? <div className={`${stylePrefix}-loading-layout`}>
                        <Loading2 backgroundColor='#eee' />
                    </div>
                    : activity && <div className={`${stylePrefix}-main`}>
                        <div className={`${stylePrefix}-title`}>{activity.title}</div>
                        <div className={`${stylePrefix}-author`}>{activity.author}</div>
                        <div
                            className={'for-preview for-markdown-preview'}
                            dangerouslySetInnerHTML={{ __html: marked(activity.content) }}
                        ></div>
                        <div className={`${stylePrefix}-icon-layout`}>
                            <IconFont
                                className={`${stylePrefix}-icon`}
                                type='anticonxiugai'
                                onClick={() => history.push(`/edit/${id}`)}
                            />
                            <IconFont
                                className={`${stylePrefix}-icon`}
                                type='anticonshanchu'
                                onClick={() => setVisible(true)}
                            />
                        </div>
                    </div>
            }
            <Modal
                title="删除活动"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        取消
                </Button>,
                    <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
                        删除
                </Button>,
                ]}
            >
                <p>确认删除《{activity?.title}》</p>
            </Modal>
        </div>
    )
}
