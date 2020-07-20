import React from 'react'
import { Button } from 'antd';
import { useHistory } from 'react-router-dom'
import { error } from '../common/config';
import 'app/styles/blog/joinButton.scss'
const stylePrefix = 'blog-joinButton'

interface JoinButtonConfig {
    lastTime: string
}

export default function JoinButton({ lastTime }: JoinButtonConfig) {
    let history = useHistory();
    const handleLastTime = () => {
        var today = new Date();
        if (today.getTime() > Number(lastTime)) {
            error('活动已结束');
            return;
        } else {
            history.push('/question');
        }
    }
    return (
        <Button
            type="primary"
            className={`${stylePrefix}-layout`}
            onClick={handleLastTime}
        >
            参加活动
        </Button>
    )
}