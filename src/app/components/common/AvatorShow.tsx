import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Link } from 'react-router-dom'
import { Badge } from 'antd';
import cookies from 'react-cookies'
import { useHistory } from 'react-router-dom'
import '../../styles/comon/avatarShow.scss'

import { error } from './config';
import { _getUserDetail, _getMessageNum } from './Api';

interface AvatorShowConfig {
    top?: number, 
    labelTop?: number
}

export default function AvatorShow({ top, labelTop }: AvatorShowConfig, props: any) {
    let history = useHistory();
    const [isMouseAvator, setIsMouseAvator] = useState(false)
    const [avatar, setAvatar] = useState('')
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
    const getUser = async () => {
        const res = await _getUserDetail();

        if (res) {
            if (res.data.code === 0) {
                props.transform_user(res.data.data)
                setAvatar(res.data.data.avatar)
            } else {
                error('token验证失败，页面将在1秒后跳转至登录页面')
                setTimeout(() => {
                    history.push('/login')
                }, 1000);
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
            return <img src={avatar} alt="头像" className='avatarImg' />
        } else {
            return <Badge count={unreadNum} offset={[5, 12]}>
                <img src={avatar} alt="头像" className='avatarImg' />
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
        getUser() // 通过token获取用户数据
        getUnreadNum() // 获取未读消息数量并且更新状态
    }, [])
    return (
        <div
            style={{
                paddingTop: (top || 10),
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
                    top: (labelTop || 10),
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