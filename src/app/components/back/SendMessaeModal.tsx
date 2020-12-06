import { Button, Modal } from 'antd'
import TextArea from 'antd/lib/input/TextArea'
import { send_message_api } from 'app/http/message_api'
import React, { useRef, useState } from 'react'
import { error, info, success } from '../common/config'
import { isSuccess } from '../common/utils'
import 'app/styles/back/userList.scss'
const stylePrefix = 'back-userList'

interface SendMessaeModalConfig {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
    selectUsers: number[];
}

export default function SendMessaeModal({
    visible,
    setVisible,
    selectUsers
}: SendMessaeModalConfig) {
    const messageRef = useRef(null)
    const [loading, setLoading] = useState(false)
    // 群发消息
    const sendMesage = async () => {
        setLoading(true)
        const value = (messageRef.current as any).state.value;
        if (!value) {
            info('输入不能为空')
        }
        const res = await send_message_api({ users: selectUsers, data: value });
        if (isSuccess(res.code)) {
            success('发送成功')
            setLoading(false)
            setVisible(false)
        } else {
            error(res.message)
        }
    }
    return (
        <Modal
            visible={visible}
            onOk={sendMesage}
            onCancel={() => setVisible(false)}
            footer={[
                <Button key="back" onClick={() => setVisible(false)}>
                    返回
                </Button>,
                <Button key="submit" type="primary" loading={loading} onClick={sendMesage}>
                    提交
                </Button>,
            ]}
        >
            <TextArea
                rows={4}
                className={`${stylePrefix}-message`}
                placeholder='请输入你想发送的消息内容'
                ref={messageRef}
            />
        </Modal>
    )
}
