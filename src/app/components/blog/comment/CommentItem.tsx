import React, { useState, useRef } from 'react'
import { Divider, Input, Button, Tooltip } from 'antd';
import avatorURL from '../../../../images/profile photo.jpg'
import '../../../styles/comment/commentItem.scss'
import ChildrenComment from './ChildrenComment';

import store from '../../../../redux/store'
import { formatTime } from 'app/components/common/utils';
import { info, IconFont } from 'app/components/common/config';
import { CommentItemInfoConfig } from './CommentShow';
import EnjoySelect from './EnjoySelect';
const stylePrefix = 'blog-commentItem'
interface CommentItemConfig {
    item: CommentItemInfoConfig,
    articleID: number,
    callback: any,
}

export default function CommentItem({ item, articleID, callback }: CommentItemConfig) {
    const [commentObjUserNickName, setCommentObjUserNickName] = useState('')
    const [isComment, setIsComment] = useState(false)
    const [isShowChildrenComments, setIsShowChildrenComments] = useState(false)
    const [commentParentID, setCommentParentID] = useState(item.commentID)
    const [showEmoji, setShowEmoji] = useState(false)
    const [commentValue, setCommentValue] = useState('')
    const inputRef = useRef(null)

    // 发表评论
    const handlePublishComment = () => {
        const inputValue = (inputRef.current as any).state.value
        if (!inputValue) {
            info('评论不能为空')
            return;
        }

        console.log(inputValue)
        callback(articleID, inputValue, (store.getState().user as any).id, commentParentID)
    }
    // 处理点击子评论回复
    const handleComment = (id: number, nickname: string, parentID?: number) => { // id为评论人的id
        setCommentObjUserNickName(nickname)
        setIsComment(true)
        setCommentParentID(parentID || commentParentID)
    }
    // 是否批量渲染子评论组件
    const judgeShowChildrenComments = (item: CommentItemInfoConfig) => {
        return (
            item.childrenComments.map((childrenItem, index: number) => {
                return <ChildrenComment
                    key={index}
                    item={childrenItem}
                    callback={handleComment}
                    isShowChildrenComments={isShowChildrenComments}
                    parentCommentID={item.commentID}
                />
            })
        )
    }
    // 加入表情
    const addEmoji = (emoji: any) => {
        console.log(emoji)
        setCommentValue(commentValue + emoji.native)
    }
    const handleInput = (event: any) => {
        if (event && event.target) {
            setCommentValue((event.target as any).value)
        }
    }
    return (
        <>
            <Divider />
            <div className={`${stylePrefix}-layout`}>
                <img src={avatorURL} alt="头像" className={`${stylePrefix}-avatar`} />
                <div className={`${stylePrefix}-main`}>
                    <div className={`${stylePrefix}-info`}>
                        <div className={`${stylePrefix}-nickname`}>{item.commentNickname}</div>
                        <div className={`${stylePrefix}-createTime`}>{formatTime(item.createTime)}</div>
                    </div>
                    <div className={`${stylePrefix}-content`}>{item.content}</div>
                    <div className={`${stylePrefix}-footer`}>
                        <div
                            className={`${stylePrefix}-comment-number`}
                            onClick={() => { setIsShowChildrenComments(true) }}
                        >{`${item.childrenComments.length} 评论`}</div>
                        <div>
                            <IconFont type="anticonpinglun" className={`${stylePrefix}-icon`} />
                            <span
                                className={`${stylePrefix}-word-comment`}
                                onClick={() => { handleComment(item.userID, item.commentNickname) }}
                            >评论</span>
                        </div>
                    </div>
                    {
                        judgeShowChildrenComments(item)
                    }
                    <div
                        style={{
                            display: (isComment ? 'flex' : 'none'),
                        }}
                        className={`${stylePrefix}-input-layout`}
                    >
                        <Input
                            placeholder={
                                commentObjUserNickName.length ? `回复 ${commentObjUserNickName}：` : '写下你的评论'
                            }
                            value={commentValue}
                            onChange={handleInput}
                            ref={inputRef}
                            className={`${stylePrefix}-input`}
                        />
                        <Tooltip title="插入表情">
                            <IconFont
                                type='anticonbiaoqing'
                                className={`${stylePrefix}-emoji-icon`}
                                onClick={() => setShowEmoji(!showEmoji)}
                            />
                        </Tooltip>
                        <Button type="primary" onClick={handlePublishComment}>回复</Button>
                    </div>
                    <div
                        className={`${stylePrefix}-emoji-layout`}
                        style={{
                            display: (showEmoji ? 'block' : 'none')
                        }}
                    >
                        <EnjoySelect addEmoji={addEmoji} />
                    </div>
                </div>
            </div>
        </>
    )
}