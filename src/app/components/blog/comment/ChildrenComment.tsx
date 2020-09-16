import React from 'react'
import avatorURL from '../../../../images/profile photo.jpg'
import { IconFont } from 'app/components/common/config'
import { formatTime } from 'app/components/common/utils'
import 'app/styles/comment/childrenComment.scss'
import { CommentItemChildrenInfoConfig } from './CommentShow'
import store from 'redux/store'

const stylePrefix = 'blog-childrenComment'

interface ChildrenCommentConfig {
    callback: any,
    item: CommentItemChildrenInfoConfig,
    isShowChildrenComments: boolean,
    parentCommentID: number
}

export default function ChildrenComment({ callback, item, isShowChildrenComments, parentCommentID }: ChildrenCommentConfig) {
    const handleComment = (id: number, nickname: string) => {
        console.log(item.parentID, parentCommentID)
        callback(id, nickname, item.commentID)
    }

    // 删除评论
    const deleteComment = async () => {
        console.log(item.commentID)
        // TODO：对接接口
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
                <div style={{ width: '100%' }} >
                    <div className={`${stylePrefix}-main`}>
                        <div className={`${stylePrefix}-nickname`}>
                            <div>{item.commentNickname}</div>
                            {temp}
                        </div>
                        <div className={`${stylePrefix}-createTime`}>{formatTime(item.createTime)}</div>
                    </div>
                    <div className={`${stylePrefix}-content`}>{item.content}</div>
                    <div className={`${stylePrefix}-icon-layout`}>
                        <IconFont
                            type='anticonhuifu'
                            className={`${stylePrefix}-icon`}
                            onClick={() => handleComment(item.userID, item.commentNickname)}
                        />
                        {
                            store.getState().user
                            && (store.getState().user as any).id === item.userID
                            && <IconFont
                                type='anticonicon_huabanfuben'
                                style={{
                                    fontSize: 18
                                }}
                                onClick={deleteComment}
                                className={`${stylePrefix}-icon`}
                            />
                        }
                    </div>
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