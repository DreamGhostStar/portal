import React from 'react'
import { Button } from 'antd';
import { useHistory } from 'react-router-dom'
import { error } from '../common/config';

interface JoinButtonConfig {
    lastTime: string
}

export default function JoinButton({ lastTime }: JoinButtonConfig) {
    let history = useHistory();
    const handleLastTime = () => {
        console.log(lastTime);
        var today = new Date();
        console.log(today.getTime().toString());
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
            style={{
                width: 100,
                height: 40,
                position: 'relative',
                left: '50%',
                marginLeft: -50,
                marginTop: 50,
                marginBottom: 50
            }}
            onClick={handleLastTime}
        >
            参加活动
        </Button>
    )
}