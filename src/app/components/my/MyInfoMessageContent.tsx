import React, { useState, useEffect } from 'react'
import '../../styles/my/myInfoMessageContent.scss'
import { _getMessageData, _readMessage } from '../common/Api';
import { error, IconFont } from '../common/config';
import Loading2 from '../common/Loading2';

import { formatTime, isSuccess } from '../common/utils';
import { click_message_api, get_message_list_api } from 'app/http/message_api';
import { Button } from 'antd';

const stylePrefix = 'my-myInfoMessageContent'

interface messageConfig {
    id: number,
    toUser: string,
    fromUser: string,
    type: string,
    content: string,
    createTime: string,
    isReaded: boolean,
    avator: string,
}

export default function MyInfoMessageContent() {
    const [clickIndex, setClickIndex] = useState<number | null>(null)
    const [messageData, setMessageData] = useState<messageConfig[]>([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)
    const [pageNum, setPageNum] = useState(1)

    const handleClick = (index: number) => {
        if (index === clickIndex) {
            setClickIndex(null)
        } else {
            setClickIndex(index)
        }
    }

    // 将消息变为已读
    const readMessage = async (id: number) => {
        setLoading(true)

        const res = await click_message_api({
            id
        });

        if (res) {
            if (isSuccess(res.code)) {
                getMessageData()
            } else {
                error(res.message)
            }
        }
    }

    const handleIsShowLoading = () => {
        if (loading) {
            return <Loading2 />
        } else {
            return messageData.map((item, index) => {
                return (
                    <div key={index} className={`${stylePrefix}-piece`}>
                        <div style={{
                            position: 'relative'
                        }}>
                            <img src={item.avator} alt="头像" className={`${stylePrefix}-avatar`} />
                            {
                                !item.isReaded && <IconFont type='anticonweidu' className={`${stylePrefix}-readIcon`} />
                            }
                        </div>
                        <div className={`${stylePrefix}-info`}>
                            <div className={`${stylePrefix}-headerInfo`}>
                                <div className={`${stylePrefix}-user-info-layout`}>
                                    <div className={`${stylePrefix}-formUser`}>
                                        {item.fromUser}
                                    </div>
                                    <div className={`${stylePrefix}-label`}>
                                        {item.type}
                                    </div>
                                </div>
                                <div className={`${stylePrefix}-operation`}>
                                    {formatTime(item.createTime)}
                                    <IconFont
                                        type="anticoncaidan"
                                        className={`${stylePrefix}-menuIcon`}
                                        onClick={() => handleClick(index)}
                                    />
                                    <div className={`${stylePrefix}-menuContent`} style={{
                                        display: (clickIndex === index ? 'block' : 'none')
                                    }}>
                                        <div className={`${stylePrefix}-menuItem`} onClick={() => readMessage(item.id)}>已读</div>
                                        <div className={`${stylePrefix}-menuItem`} >删除该消息</div>
                                    </div>
                                </div>
                            </div>
                            <div className={`${stylePrefix}-myMessageContent`}>
                                {item.content}
                            </div>
                        </div>

                    </div>
                );
            })
        }

    }

    useEffect(() => {
        getMessageData()
    }, [page])

    // 获取消息列表
    const getMessageData = async () => {
        setLoading(true)
        const res = await get_message_list_api({ page: page });

        if (res) {
            if (isSuccess(res.code)) {
                setMessageData(res.data.data)
                setPageNum(res.data.pageNum)
            } else {
                error(res.message)
            }
        }
        setLoading(false)
    }
    return (
        <div>
            <div className={`${stylePrefix}-layout`} style={{
                width: (loading ? 820 : 'auto'),
                height: (loading ? 400 : 'auto')
            }}>
                {
                    handleIsShowLoading()
                }
            </div>
            <div className={`${stylePrefix}-button-layout`}>
                <Button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >Previous</Button>
                <Button
                    disabled={page === pageNum}
                    onClick={() => setPage(page + 1)}
                    type="primary"
                >Next</Button>
            </div>
        </div>
    )
}