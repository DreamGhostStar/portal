import React, { useState, useEffect } from 'react'
import { HashRouter as Router, Link, useHistory } from 'react-router-dom'
import { Badge, Popover } from 'antd';
import cookies from 'react-cookies'
import '../../styles/comon/authorShow.scss'

import { error, IconFont } from './config';
import { _getUserDetail, _getMessageNum } from './Api';

import messageNum from 'model/messageNum.json'
import userInfo from 'model/userInfo.json'
import addTip from 'static/addTip.json'
import { isMobile } from './utils';

const stylePrefix = 'common-authorShow'

interface AuthorShowConfig {
    top?: number,
    labelTop?: number,
    remove_user: any
    isHome: boolean
}

export default function AuthorShow({ top, labelTop, remove_user, isHome }: AuthorShowConfig) {
    const history = useHistory()
    const [isMouseAvator, setIsMouseAvator] = useState(false)
    const [unreadNum, setUnreadNum] = useState(0)
    const [avatar, setAvatar] = useState('')
    const [role, setRole] = useState(1)
    const addElemTip = <div className={`${stylePrefix}-add-layout`}>
        {
            addTip.map((addTipItem, index) => {
                return <div
                    key={index}
                    className={`${stylePrefix}-add-item`}
                    onClick={() => history.push(addTipItem.path)}
                >
                    <IconFont
                        type={addTipItem.icon}
                        style={{
                            color: addTipItem.color
                        }}
                        className={`${stylePrefix}-add-item-icon`}
                    />
                    <div className={`${stylePrefix}-add-item-title`}>{addTipItem.title}</div>
                </div>
            })
        }
    </div>
    // 获取用户信息
    const getUserInfo = async () => {
        setAvatar(userInfo.avatar)
        setRole(3)
    }
    // 获取未读消息数量
    const getUnreadNum = async () => {
        setUnreadNum(messageNum)
        // const res = await _getMessageNum();

        // if (res) {
        //     if (res.data.code === 0) {
        //         setUnreadNum(res.data.data)
        //     } else {
        //         error(res.data.message)
        //     }
        // }
    }

    // 退出登录，并且删除redux中的数据，清除cookie
    const handleExit = () => {
        cookies.remove('Authorization')
        remove_user()
    }

    // 判断是否头像处的未读消息数
    const judgeShowUnreadMessageNum = () => {
        if (!unreadNum) {
            return <img src={avatar} alt="头像" className={`${stylePrefix}-avatarImg`} />
        } else {
            return <Badge count={unreadNum} offset={[5, 12]}>
                <img src={avatar} alt="头像" className={`${stylePrefix}-avatarImg`} />
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
        getUserInfo();
    }, [])
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                role >= 2 && !isHome && <Popover placement="bottom" title='' content={addElemTip} trigger="hover">
                    <IconFont type='anticonzengjia' className={`${stylePrefix}-icon`} />
                </Popover>
            }
            <div
                style={{
                    paddingTop: (top === null ? 10 : top),
                }}
                className={`removeFloat ${stylePrefix}-avatarShow`}
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
                    className={`${stylePrefix}-avatarMenu`}
                >
                    <Link
                        to={{
                            pathname: `/my/info`
                        }}
                        className={`${stylePrefix}-avatarItem`}
                    >
                        我的信息
                </Link>
                    <Link
                        to={{
                            pathname: `/my/message`
                        }}
                        className={`${stylePrefix}-avatarItem`}
                    >
                        {judgeShowUnreadMyMessageNum()}
                    </Link>
                    {
                        role >= 2 && <Link
                            to={{
                                pathname: `/back/activity/list`
                            }}
                            className={`${stylePrefix}-avatarItem`}
                        >
                            进入后台
                    </Link>
                    }
                    <Link
                        to='#'
                        className={`${stylePrefix}-avatarItem`}
                        onClick={handleExit}>退出登录</Link>
                </div>
            </div>
        </div>
    )
}