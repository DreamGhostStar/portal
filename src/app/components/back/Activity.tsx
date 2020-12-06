import React, { useEffect, useState } from 'react'
import { isSuccess, simpleFormatTimeWithoutDate } from '../common/utils';
import 'app/styles/back/activity.scss'
import Loading2 from '../common/Loading2';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { get_list_activity_api } from 'app/http/blog';
import { error } from '../common/config';
const stylePrefix = 'back-activity'

interface ActivityConfig {
    createTime: string;
    data: {
        articleID: number;
        author: {
            id: number;
            username: string;
            avatar: string;
            nickname: string;
            motto: string;
            year: string;
        };
        title: string;
        abstract: string;
        isTop: boolean;
        firstpicture: string;
    }[];
}

export default function Activity() {
    const history = useHistory()
    const [activity, setActivity] = useState<ActivityConfig[]>([])
    const [loading, setLoading] = useState(false)
    const [page, setPage] = useState(1)
    // 滚动加载
    const loadMore = () => {
        //文档内容实际高度（包括超出视窗的溢出部分）
        var scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
        //滚动条滚动距离
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        //窗口可视范围高度
        var clientHeight = window.innerHeight || Math.min(document.documentElement.clientHeight, document.body.clientHeight);

        if (clientHeight + scrollTop >= scrollHeight) {
            setLoading(true)
            setPage(page + 1)
        }
    }
    // 获取列表活动
    const getActivity = async () => {
        const res = await get_list_activity_api({ page: page })
        if (isSuccess(res.code)) {
            setActivity([...activity, ...res.data])
        } else {
            error(res.message)
        }
        setLoading(false)
    }
    useEffect(() => {
        window.addEventListener('scroll', loadMore)
        setLoading(true)
        return () => {
            window.removeEventListener('scroll', loadMore)
        }
    }, [])
    useEffect(() => {
        getActivity()
    }, [page])
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                activity.map((activityInType, index) => {
                    return <div
                        key={index}
                        className={`${stylePrefix}-activity-layout`}
                    >
                        <div className={`${stylePrefix}-title`}>{simpleFormatTimeWithoutDate(activityInType.createTime)}</div>
                        <div className={`${stylePrefix}-activity-item-layout`}>
                            {
                                activityInType.data.map((activityItem, index) => {
                                    return <div
                                        key={index}
                                        className={`${stylePrefix}-activity-item`}
                                    >
                                        <div className={`${stylePrefix}-activity-item-title`}>{activityItem.title}</div>
                                        <div className={`${stylePrefix}-activity-item-nickname`}>{activityItem.author.nickname}</div>
                                        <div className={`${stylePrefix}-activity-item-abstract`}>{activityItem.abstract}</div>
                                        <Button
                                            type="primary"
                                            shape="round"
                                            className={`${stylePrefix}-activity-item-btn`}
                                            onClick={() => history.push(`/back/activity/${activityItem.articleID}`)}
                                        >
                                            查看活动
                                        </Button>
                                    </div>
                                })
                            }
                        </div>
                    </div>
                })
            }
            {
                loading && <div className={`${stylePrefix}-loading`}>
                    <Loading2 backgroundColor='#eee' />
                </div>
            }
        </div>
    )
}
