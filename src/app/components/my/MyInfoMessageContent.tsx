import React, { useState, useEffect } from 'react'
import '../../styles/my/myInfoMessageContent.scss'
import { _getMessageData, _readMessage } from '../common/Api';
import { error, IconFont } from '../common/config';
import Loading2 from '../common/Loading2';

export default function MyInfoMessageContent() {
    const [clickIndex, setClickIndex] = useState<number | null>(null)
    const [mouseIndex, setMouseIndex] = useState(null)
    const [messageData, setMessageData] = useState<any[]>([])
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
        setLoading(true)

        const res = await _readMessage({
            id
        });

        if (res) {
            if (res.data.code === 0) {
                getMessageData()
            } else {
                error(res.data.message)
            }
        }
    }

    const handleIsShowLoading = () => {
        if (loading) {
            return <Loading2 />
        } else {
            return messageData.map((item, index) => {
                let createTime = new Date(Number(item.createTime));
                let year = createTime.getFullYear();
                let month = createTime.getMonth() + 1;
                let date = createTime.getDate();
                let hour = createTime.getHours();
                let minute = createTime.getMinutes();
                let temp;

                if (!item.readed) {
                    temp = (<IconFont type='anticonweidu' style={{
                        position: 'absolute',
                        top: 0,
                        color: '#f00',
                        left: 0,
                        fontSize: 16
                    }} />)
                }
                return (
                    <div key={index} className='piece'>
                        <div style={{
                            position: 'relative'
                        }}>
                            <img src={item.avator} alt="头像" className='avatar' />
                            {temp}
                        </div>
                        <div className='info'>
                            <div className='headerInfo'>
                                <div className='formUser'>
                                    {item.fromUser}
                                </div>
                                <div className='operation'>
                                    {`${year}-${month}-${date} ${hour}:${minute}`}
                                    <IconFont type="anticoncaidan" className='menuIcon' onClick={() => handleClick(index)} />
                                    <div className='menuContent' style={{
                                        display: (clickIndex === index ? 'block' : 'none')
                                    }}>
                                        <div className='menuItem' onClick={() => readMessage(item.id)}>已读</div>
                                        <div className='menuItem' >删除该消息</div>
                                    </div>
                                </div>
                            </div>
                            <div className='myMessageContent'>
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
        const res = await _getMessageData();

        if (res) {
            if (res.data.code === 0) {
                setMessageData(res.data.data.reverse())
                setLoading(false)
            } else {
                error(res.data.message)
            }
        }
    }
    return (
        <div className='myInfoMessageContent' style={{
            width: (loading ? 820 : 'auto'),
            height: (loading ? 400 : 'auto')
        }}>
            {
                handleIsShowLoading()
            }
        </div>
    )
}