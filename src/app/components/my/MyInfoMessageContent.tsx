import React, { useState, useEffect } from 'react'
import '../../styles/my/myInfoMessageContent.scss'
import { _getMessageData, _readMessage } from '../common/Api';
import { error, IconFont } from '../common/config';
import Loading2 from '../common/Loading2';

import messageList from 'model/messageList.json'
import { formatTime } from '../common/utils';

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

    const handleClick = (index: number) => {
        if (index === clickIndex) {
            setClickIndex(null)
        } else {
            setClickIndex(index)
        }
    }

    // 将消息变为已读
    const readMessage = async (id: number) => {
        console.log(id)
        // setLoading(true)

        // const res = await _readMessage({
        //     id
        // });

        // if (res) {
        //     if (res.data.code === 0) {
        //         getMessageData()
        //     } else {
        //         error(res.data.message)
        //     }
        // }
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
    }, [])

    // 获取消息列表
    const getMessageData = async () => {
        setLoading(true)
        setMessageData(messageList)
        setLoading(false)
        // setLoading(true)
        // const res = await _getMessageData();

        // if (res) {
        //     if (res.data.code === 0) {
        //         setMessageData(res.data.data.reverse())
        //         setLoading(false)
        //     } else {
        //         error(res.data.message)
        //     }
        // }
    }
    return (
        <div className={`${stylePrefix}-layout`} style={{
            width: (loading ? 820 : 'auto'),
            height: (loading ? 400 : 'auto')
        }}>
            {
                handleIsShowLoading()
            }
        </div>
    )
}