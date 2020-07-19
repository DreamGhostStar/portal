import React from 'react'
import avatorURL from '../../../../images/profile photo.jpg'
import { IconFont } from 'app/components/common/config'
import { formatTime } from 'app/components/common/utils'

interface ChildrenCommentConfig {
    callback: any, 
    item: any, 
    isShowChildrenComments: boolean, 
    parentCommentID: number
}

// TODO: callback需要在父组件里更改
export default function ChildrenComment({callback, item, isShowChildrenComments, parentCommentID}: ChildrenCommentConfig) {
    const handleComment = (id: number, nickname: string) => {
        callback(id, nickname, item.commentID)
    }

    const judgeShow = () => {
        let temp;
        if (item.parentID !== parentCommentID) {
            temp = <div style={{
                display: 'flex',
                justifyContent: 'flex-start'
            }}>
                <div style={{
                    color: 'blue',
                    paddingLeft: 5,
                    paddingRight: 5
                }}>回复</div>
                <div>{item.parentNickname}</div>
            </div>
        }

        if (!isShowChildrenComments) {
            return <div></div>
        }

        return (
            <>
                <img src={avatorURL} alt="头僝" style={{
                    borderRadius: '50%',
                    marginRight: 10,
                    width: 40,
                    height: 40,
                }} />
                <div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        paddingRight: 20,
                        width: 730
                    }}>
                        <div style={{
                            color: '#bbb',
                            display: 'flex',
                            justifyContent: 'flex-start'
                        }}>
                            <div>{item.commentNickname}</div>
                            {temp}
                        </div>
                        <div style={{
                            color: '#bbb',
                        }}>{formatTime(item.createTime)}</div>
                    </div>
                    <div style={{
                        paddingRight: 20
                    }}>{item.content}</div>
                    <IconFont type='anticonhuifu' style={{
                        paddingTop: 10,
                        color: '#ccc'
                    }} onClick={() => handleComment(item.userID, item.commentNickname)} />
                </div>
            </>
        )
    }
    return (
        <div style={{
            backgroundColor: '#eee',
            paddingBottom: (isShowChildrenComments ? 20 : 0),
            paddingLeft: 15,
            paddingTop: (isShowChildrenComments ? 10 : 0),
            display: 'flex',
            justifyContent: 'flex-start',
            transitionDuration: '.3s',
            height: (isShowChildrenComments ? 100 : 0)
        }}>
            {judgeShow()}
        </div>
    )
}