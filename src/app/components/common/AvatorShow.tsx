import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { Badge } from 'antd';
import cookies from 'react-cookies'
import '../../styles/comon/avatarShow.scss'

import { error } from './config';
import { _getUserDetail, _getMessageNum } from './Api';
import store from 'redux/store';

interface AvatorShowConfig {
    top?: number, 
    labelTop?: number,
    remove_user: any
}

export default function AvatorShow(props: AvatorShowConfig) {
    const [isMouseAvator, setIsMouseAvator] = useState(false)
    const [unreadNum, setUnreadNum] = useState(0)
    const getUnreadNum = async () => {
        const res = await _getMessageNum();

        if (res) {
            if (res.data.code === 0) {
                setUnreadNum(res.data.data)
            } else {
                error(res.data.message)
            }
        }
    }

    // 退出登录，并且删除redux中的数据，清除cookie
    const handleExit = () => {
        cookies.remove('Authorization')
        props.remove_user()
    }

    // 判断是否头像处的未读消息数
    const judgeShowUnreadMessageNum = () => {
        if (!unreadNum) {
            return <img src={(store.getState().user as any).avatar} alt="头像" className='avatarImg' />
        } else {
            return <Badge count={unreadNum} offset={[5, 12]}>
                <img src={(store.getState().user as any).avatar} alt="头像" className='avatarImg' />
            </Badge>
        }
    }

    // 判断是否我的消息链接处的未读消息数
    const judgeShowUnreadMyMessageNum = () => {
        if (unreadNum) {
            return <Badge count={unreadNum} offset={[-75, 8]}>
                我的消息
            </Badge>
        } else {
            return '我的消息'
        }
    }
    useEffect(() => {
        getUnreadNum() // 获取未读消息数量并且更新状态
    }, [])
    return (
        <div
            style={{
                paddingTop: (props.top || 10),
            }}
            className="removeFloat avatarShow"
            onMouseOver={() => { setIsMouseAvator(true) }}
            onMouseOut={() => { setIsMouseAvator(false) }}
        >
            {
                judgeShowUnreadMessageNum()
            }
            <div
                style={{
                    top: (props.labelTop || 10),
                    display: (isMouseAvator ? 'block' : 'none'),
                }}
                onMouseOver={() => { setIsMouseAvator(true) }}
                onMouseOut={() => { setIsMouseAvator(false) }}
                className='avatarMenu'
            >
                <Link
                    to={{
                        pathname: `/my/info`
                    }}
                    className='avatarItem'
                >
                    我的信息
                </Link>
                <Link
                    to={{
                        pathname: `/my/message`
                    }}
                    className='avatarItem'
                >
                    {judgeShowUnreadMyMessageNum()}
                </Link>
                <Link
                    to='#'
                    className='avatarItem'
                    onClick={handleExit}>退出登录</Link>
            </div>
        </div>
    )
}