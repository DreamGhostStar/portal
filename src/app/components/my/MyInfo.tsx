import React, { useState, useEffect, useRef } from 'react'
import '../../styles/my/myInfo.scss'
import MyInfoSubItem from './MyInfoSubItem';
import Driver from '../common/Driver';
import { _getUserDetail, _alterUserInfo } from '../common/Api';
import { error, success, info, maxLength, IconFont, userConfig } from '../common/config'
import { Button, Input } from 'antd';
import UploadAvator from '../common/UploadAvator';

import '../common/config'
import Loading2 from '../common/Loading2';
import store from 'redux/store';

import { isMobile, isSuccess } from '../common/utils';
import { alter_user_info_api, get_user_detail_api } from 'app/http/user';

const stylePrefix = 'my-myInfo';

export default function MyInfo() {
    const [myInfo, setMyInfo] = useState<null | userConfig>(store.getState().user)
    const [isAlter, setIsAlter] = useState(false)
    const [loading, setLoading] = useState(false)
    const inputRef = useRef(null)

    useEffect(() => {
        getUserDetail()
    }, [])

    const getUserDetail = async () => {
        setLoading(true)
        const res = await get_user_detail_api({});

        if (res) {
            if (isSuccess(res.code)) {
                setMyInfo(res.data)
            } else {
                error(res.message)
            }
        }
        setLoading(false)
    }

    // 保存图片路径信息
    const saveImg = (avatar: string) => {
        if (myInfo) {
            const tempMyInfo = myInfo;
            tempMyInfo.avatar = avatar;
            setMyInfo(tempMyInfo)
        }
    }

    // 保存除昵称和头像外的所有信息
    const saveOtherInfo = (type: string, value: string) => {
        if (myInfo) {
            const tempMyInfo = myInfo;
            tempMyInfo[type] = value
            setMyInfo(tempMyInfo)
        }
    }

    // 保存数据到后端数据库
    const saveData = () => {
        alterUserInfo();
    }

    // 修改用户信息
    const alterUserInfo = async () => {
        if(!myInfo){
            return
        }
        const res = await alter_user_info_api({
            nickname: myInfo.nickname,
            avator: myInfo.avatar,
            grade: myInfo.year,
            motto: myInfo.motto,
            email: myInfo.email
        });

        if (res) {
            if (isSuccess(res.code)) {
                success('修改信息成功')
            } else {
                error(res.message)
            }
        }
    }

    // 保存昵称的值
    const saveNickNameData = () => {
        let nickname = (inputRef.current as any).state.value;
        if (!nickname) {
            error('输入不能为空')
            return;
        }

        if (myInfo) {
            const tempMyInfo = myInfo;
            tempMyInfo.nickname = nickname;
            setMyInfo(tempMyInfo)
        }
        setIsAlter(false)
    }

    const handleNickNameMaxLength = (event: any) => {
        if (event && event.target && event.target.value) {
            let value = event.target.value;

            if (value.length === maxLength) {
                info(`昵称不能超过${maxLength}位数`)
            }
        }
    }

    const handleEmpty = () => {
        if (loading) {
            return <div style={{
                height: 600,
                width: 850
            }}>
                <Loading2 />
            </div>
        }

        if (!myInfo) {
            return <div className={`${stylePrefix}-empty`}>
                用户信息为空
            </div>
        } else {
            return <div className={`${stylePrefix}-layout`}>
                <div className={`${stylePrefix}-imgSelectPos`}>
                    <UploadAvator img={myInfo.avatar} saveImg={saveImg} />
                </div>
                <div className={`${stylePrefix}-content`}>
                    <div
                        className={`${stylePrefix}-nickname`}
                        style={{
                            display: (isAlter ? 'none' : 'block')
                        }}
                    >
                        <div className={`${stylePrefix}-value`}>{myInfo.nickname}</div>
                        {
                            !isMobile() && <div className={`${stylePrefix}-tip`}>
                                <IconFont type='anticonxiugai1' className={`${stylePrefix}-icon`} onClick={() => setIsAlter(true)} />
                                <span onClick={() => setIsAlter(true)}>修改</span>
                            </div>
                        }
                    </div>
                    <div
                        style={{
                            display: (isAlter ? 'block' : 'none')
                        }}
                        className={`${stylePrefix}-alterNickname`}
                    >
                        <Input
                            ref={inputRef}
                            className={`${stylePrefix}-input`}
                            maxLength={maxLength}
                            onChange={handleNickNameMaxLength}
                        />
                        <div className={`${stylePrefix}-operation`}>
                            <Button type="primary" onClick={saveNickNameData}>保存</Button>
                            <Button onClick={() => setIsAlter(false)}>取消</Button>
                        </div>
                    </div>
                    <MyInfoSubItem label='年级' transformValue={myInfo.year} type='year' saveOtherInfo={saveOtherInfo} />
                    <MyInfoSubItem label='座右铭' transformValue={myInfo.motto} type='motto' saveOtherInfo={saveOtherInfo} />
                    <MyInfoSubItem label='邮箱' transformValue={myInfo.email} type='email' saveOtherInfo={saveOtherInfo} />
                    <Driver style={{
                        height: 2
                    }} />
                    {
                        isMobile()
                            ? <div></div>
                            : <Button
                                type="primary"
                                className={`${stylePrefix}-myInfoButton`}
                                onClick={saveData}
                            >保存</Button>
                    }
                </div>
            </div>
        }
    }
    return (
        <>
            {
                handleEmpty()
            }
        </>
    )
}