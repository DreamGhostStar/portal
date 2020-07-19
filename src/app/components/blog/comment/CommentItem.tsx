import React, { useState, useRef } from 'react'
import { Divider, Input, Button } from 'antd';
import avatorURL from '../../../../images/profile photo.jpg'
import '../../../styles/comment/commentItem.scss'
import ChildrenComment from './ChildrenComment';

import store from '../../../../redux/store'
import { formatTime } from 'app/components/common/utils';
import { info, IconFont } from 'app/components/common/config';
interface CommentItemConfig {
    item: any,
    articleID: number,
    callback: any,
}

export default function CommentItem({ item, articleID, callback }: CommentItemConfig) {
    const [commentObjUserNickName, setCommentObjUserNickName] = useState('')
    const [commentObjUserID, setCommentObjUserID] = useState<number | null>(null)
    const [isComment, setIsComment] = useState(false)
    const [isShowChildrenComments, setIsShowChildrenComments] = useState(false)
    const [commentParentID, setCommentParentID] = useState(item.commentID)
    const inputRef = useRef(null)

    // 发表评论
    const handlePublishComment = () => {
        const inputValue = (inputRef.current as any).state.value
        if (!inputValue) {
            info('评论不能为空')
            return;
        }

        callback(articleID, inputValue, (store.getState().user as any).id, commentParentID)
    }

    // 处理点击子评论回复
    const handleComment = (id: number, nickname: string, parentID?: number) => { // id为评论人的id
        setCommentObjUserID(id)
        setCommentObjUserNickName(nickname)
        setIsComment(true)
        setCommentParentID(parentID || commentParentID)
    }

    // 是否批量渲染子评论组件
    const judgeShowChildrenComments = (item: any) => {
        return (
            item.childrenComments.map((childrenItem: any, index: number) => {
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
    return (
        <>
            <Divider />
            <div className='commentItem'>
                <img src={avatorURL} alt="头像" width={50} height={50} style={{
                    borderRadius: '50%',
                    marginRight: 10
                }} />
                <div style={{
                    width: 800
                }}>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                        <div style={{
                            color: '#bbb',
                            marginBottom: 5,
                            fontSize: 18
                        }}>{item.commentNickname}</div>
                        <div style={{
                            width: 100,
                            color: '#ddd'
                        }}>{formatTime(item.createTime)}</div>
                    </div>
                    <div style={{
                        width: 800,
                        marginBottom: 10
                    }}>{item.content}</div>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: 10
                    }}>
                        <div style={{
                            color: '#bbb',
                            cursor: 'pointer'
                        }} onClick={() => { setIsShowChildrenComments(true) }}>{`${item.childrenComments.length} 评论`}</div>
                        <div>
                            <IconFont type="anticonpinglun" style={{
                                fontSize: 20,
                                color: '#ddd',
                                marginRight: 5
                            }} />
                            <span style={{
                                color: '#ddd',
                                fontSize: 16,
                                lineHeight: '6px',
                                cursor: 'pointer'
                            }} onClick={() => { handleComment(item.userID, item.commentNickname) }}>评论</span>
                        </div>
                    </div>
                    {
                        judgeShowChildrenComments(item)
                    }
                    <div style={{
                        display: (isComment ? 'flex' : 'none'),
                        justifyContent: 'space-between',
                        paddingTop: 20,
                    }}>
                        <Input placeholder={
                            commentObjUserNickName.length ? `回复 ${commentObjUserNickName}：` : '写下你的评论'
                        } style={{
                            width: 700
                        }} ref={inputRef} />
                        <Button type="primary" onClick={handlePublishComment}>回复</Button>
                    </div>
                </div>
            </div>
        </>
    )
}