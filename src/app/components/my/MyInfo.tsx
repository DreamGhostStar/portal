import React, { useState, useEffect, useRef } from 'react'
import '../../styles/my/myInfo.scss'
import MyInfoSubItem from './MyInfoSubItem';
import Driver from '../common/Driver';
import { _getUserDetail, _alterUserInfo } from '../common/Api';
import { error, success, info, maxLength, IconFont } from '../common/config'
import { Button, Input } from 'antd';
import UploadAvator from '../common/UploadAvator';

import '../common/config'
import Loading2 from '../common/Loading2';

export default function MyInfo() {
    const [myInfo, setMyInfo] = useState<any>(null)
    const [isAlter, setIsAlter] = useState(false)
    const [loading, setLoading] = useState(true)
    const inputRef = useRef(null)

    useEffect(() => {
        getUserDetail()
    }, [])

    const getUserDetail = async () => {
        const res = await _getUserDetail();

        if (res) {
            if (res.data.code === 0) {
                setMyInfo(res.data.data)
                setLoading(false)
            } else {
                error(res.data.message)
            }
        }
    }

    // 保存图片路径信息
    const saveImg = (avatar: string) => {
        const tempMyInfo = myInfo;
        tempMyInfo.avatar = avatar;
        setMyInfo(tempMyInfo)
    }

    // 保存除昵称和头像外的所有信息
    const saveOtherInfo = (type: string, value: string) => {
        const tempMyInfo = myInfo;
        tempMyInfo[type] = value
        setMyInfo(tempMyInfo)
    }

    // 保存数据到后端数据库
    const saveData = () => {
        alterUserInfo();
    }

    const alterUserInfo = async () => {
        const res = await _alterUserInfo({
            nickname: myInfo.nickname,
            avator: myInfo.avatar,
            grade: myInfo.year,
            motto: myInfo.motto,
            email: myInfo.email
        });

        if (res) {
            if (res.data.code === 0) {
                success('修改信息成功')
            } else {
                error(res.data.message)
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

        const tempMyInfo = myInfo;
        tempMyInfo.nickname = nickname;
        setMyInfo(tempMyInfo)
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
            return <div className='empty'>
                用户信息为空
            </div>
        } else {
            return <div style={{
                position: 'relative',
            }}>
                <div className='imgSelectPos'>
                    <UploadAvator img={myInfo.avatar} saveImg={saveImg} />
                </div>
                <div className='content'>
                    <div
                        className='nickname'
                        style={{
                            display: (isAlter ? 'none' : 'block')
                        }}
                    >
                        <div className='value'>{myInfo.nickname}</div>
                        <div className='tip'>
                            <IconFont type='anticonxiugai1' className='icon' onClick={() => { setIsAlter(true) }} />
                            <span onClick={() => { setIsAlter(true) }}>修改</span>
                        </div>
                    </div>
                    <div
                        style={{
                            display: (isAlter ? 'block' : 'none')
                        }}
                        className='alterNickname'
                    >
                        <Input
                            ref={inputRef}
                            className='input'
                            maxLength={maxLength}
                            onChange={handleNickNameMaxLength}
                        />
                        <div className='operation'>
                            <Button type="primary" onClick={saveNickNameData}>保存</Button>
                            <Button onClick={() => { setIsAlter(false) }}>取消</Button>
                        </div>
                    </div>
                    <MyInfoSubItem label='年级' transformValue={myInfo.year} type='year' saveOtherInfo={saveOtherInfo} />
                    <MyInfoSubItem label='座右铭' transformValue={myInfo.motto} type='motto' saveOtherInfo={saveOtherInfo} />
                    <MyInfoSubItem label='邮箱' transformValue={myInfo.email} type='email' saveOtherInfo={saveOtherInfo} />
                    <Driver height={2} />
                    <Button type="primary" className='myInfoButton' onClick={saveData}>保存</Button>
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