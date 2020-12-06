import { Button, Input, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import React, { useRef, useState } from 'react'
import UploadAvator from '../common/UploadAvator';
import 'app/styles/back/userList.scss'
import { error, success, userConfig } from '../common/config';
import { admin_alter_user_info_api } from 'app/http/user';
import { isSuccess } from '../common/utils';

interface AlterUserInfoConfig {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: userConfig | null;
    setUserInfo: React.Dispatch<React.SetStateAction<userConfig | null>>;
}
const stylePrefix = 'back-userList'

export default function AlterUserInfo({
    visible,
    userInfo,
    setUserInfo,
    setVisible
}: AlterUserInfoConfig) {
    const [modalLoading, setModalLoading] = useState(false) // 对话框加载中状态
    const nicknameRef = useRef(null)
    const yearRef = useRef(null)
    const mottoRef = useRef(null)
    const emailRef = useRef(null)
    // 管理员修改用户信息
    const handleOk = async () => {
        const nickname = (nicknameRef.current as any).state.value;
        const year = (yearRef.current as any).state.value;
        const motto = (mottoRef.current as any).state.value;
        const email = (emailRef.current as any).state.value;
        setModalLoading(true)
        if (!userInfo) {
            return
        }
        const res = await admin_alter_user_info_api({
            userID: userInfo.id,
            nickname: nickname,
            grade: year,
            motto: motto,
            email: email,
            avatar: userInfo.avatar, // TODO: 可能有错误
        })
        if (isSuccess(res.code)) {
            success('修改成功')
            setVisible(false)
            setModalLoading(false)
        } else {
            error(res.message)
        }
    }
    return (
        <Modal
            visible={visible}
            onOk={handleOk}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="back" onClick={() => setVisible(false)}>
                    返回
            </Button>,
                <Button key="submit" type="primary" loading={modalLoading} onClick={handleOk}>
                    提交
            </Button>,
            ]}
        >
            {
                userInfo && <div className={`${stylePrefix}-info-layout`}>
                    <div className={`${stylePrefix}-img-layout`}>
                        <UploadAvator
                            img={userInfo.avatar}
                            saveImg={(url: string) => setUserInfo({
                                ...userInfo,
                                avatar: url
                            })}
                        />
                    </div>
                    <div className={`${stylePrefix}-input-layout`}>
                        <Input
                            defaultValue={userInfo.nickname}
                            placeholder="请输入用户的昵称"
                            className={`${stylePrefix}-input`}
                            ref={nicknameRef}
                        />
                        <Input
                            defaultValue={userInfo.year}
                            placeholder="请输入用户的年级"
                            className={`${stylePrefix}-input`}
                            ref={yearRef}
                        />
                        <TextArea
                            rows={4}
                            defaultValue={userInfo.motto}
                            placeholder='请输入用户简介'
                            className={`${stylePrefix}-input`}
                            ref={mottoRef}
                        />
                        <Input
                            defaultValue={userInfo.email}
                            placeholder="请输入用户的邮箱"
                            className={`${stylePrefix}-input`}
                            ref={emailRef}
                        />
                    </div>
                </div>
            }
        </Modal>
    )
}
