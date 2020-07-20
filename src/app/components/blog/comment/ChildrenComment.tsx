import React from 'react'
import avatorURL from '../../../../images/profile photo.jpg'
import { IconFont } from 'app/components/common/config'
import { formatTime } from 'app/components/common/utils'
import 'app/styles/comment/childrenComment.scss'

const stylePrefix = 'blog-commentShow'

interface ChildrenCommentConfig {
    callback: any,
    item: any,
    isShowChildrenComments: boolean,
    parentCommentID: number
}

export default function ChildrenComment({ callback, item, isShowChildrenComments, parentCommentID }: ChildrenCommentConfig) {
    const handleComment = (id: number, nickname: string) => {
        callback(id, nickname, item.commentID)
    }

    const judgeShow = () => {
        let temp;
        if (item.parentID !== parentCommentID) {
            temp = <div className={`${stylePrefix}-reply-btn-layout`}>
                <div className={`${stylePrefix}-reply-btn`}>回复</div>
                <div>{item.parentNickname}</div>
            </div>
        }

        if (!isShowChildrenComments) {
            return <div></div>
        }

        return (
            <>
                <img src={avatorURL} alt="头僝" className={`${stylePrefix}-avatar`} />
                <div>
                    <div className={`${stylePrefix}-main`}>
                        <div className={`${stylePrefix}-nickname`}>
                            <div>{item.commentNickname}</div>
                            {temp}
                        </div>
                        <div className={`${stylePrefix}-createTime`}>{formatTime(item.createTime)}</div>
                    </div>
                    <div className={`${stylePrefix}-content`}>{item.content}</div>
                    <IconFont type='anticonhuifu' className={`${stylePrefix}-icon`} onClick={() => handleComment(item.userID, item.commentNickname)} />
                </div>
            </>
        )
    }
    return (
        <div
            style={{
                paddingBottom: (isShowChildrenComments ? 20 : 0),
                paddingTop: (isShowChildrenComments ? 10 : 0),
                height: (isShowChildrenComments ? 100 : 0)
            }}
            className={`${stylePrefix}-layout`}
        >
            {judgeShow()}
        </div>
    )
}