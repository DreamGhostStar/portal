import React, { useState, useEffect } from 'react'
import { Button, Input } from 'antd';
import CommentItem from './CommentItem';
import { _getCommentList, _publishComment } from '../../common/Api';
import '../../../styles/comment/commentShow.scss'
import { error, success } from '../../common/config';
import Loading2 from '../../common/Loading2';

interface CommentShowConfig {
    articleID: number
}

export default function CommentShow({ articleID }: CommentShowConfig) {
    const [commentData, setCommentData] = useState([])
    const [isComment, setIsComment] = useState(false)
    const [value, setValue] = useState('')
    const [loading, setLoading] = useState(true)

    const publishComment = async (articleID: number, content: string, userID: number, parentCommentID: number) => {
        const res = await _publishComment({
            articleID,
            content,
            userID,
            parentCommentID
        })

        if (res) {
            if (res.data.code === 0) {
                success('评论成功')
                getCommentList(articleID)
            } else {
                error(res.data.message)
            }
        }
    }

    // 获取列表评论接口
    const getCommentList = async (articleID: number) => {
        const res = await _getCommentList({
            articleID
        });

        if (res) {
            if (res.data.code === 0) {
                setCommentData(res.data.data)
                setLoading(false)
            } else {
                error(res.data.message)
            }
        }
    }

    // 在input改变的时候，保存其值
    const saveInputValue = (event: any) => {
        if (event && event.target && event.target.value) {
            let tempValue = event.target.value;
            setValue(tempValue)
        }
    }

    const handleShowCommentInput = () => {
        if (!isComment) {
            setIsComment(true)
        } else {
            console.log(value);
        }
    }

    // 判断是否有评论
    const generateCommentList = () => {
        if (loading) {
            return <div style={{
                height: 400
            }}>
                <Loading2 />
            </div>
        }

        if (commentData.length === 0) {
            return <div className='comment'>
                <div className='emptyComment'>
                    暂无评论
                </div>
                <Input
                    placeholder="写下你的评论"
                    className='input'
                    style={{
                        display: (isComment ? 'block' : 'none')
                    }}
                    onChange={event => saveInputValue(event)}
                />
                <div className='operatePiece'>
                    <Button
                        type="primary"
                        className={isComment ? '' : 'button'}
                        onClick={handleShowCommentInput}
                    >
                        {isComment ? '发布' : '发表评论'}
                    </Button>
                    <Button
                        onClick={() => { setIsComment(true) }}
                        style={{
                            display: (isComment ? 'inline-block' : 'none')
                        }}
                    >取消</Button>
                </div>
            </div>
        } else {
            let temp: any[] = [];
            commentData.map((item, index) => {
                temp.push(
                    <CommentItem
                        item={item}
                        key={index}
                        articleID={articleID}
                        callback={publishComment}
                    />
                )

                return index;
            })

            return temp;
        }
    }

    useEffect(() => {
        getCommentList(articleID)
    }, [articleID])

    return (
        <div>
            <div style={{
                height: 50,
                width: '100%',
                backgroundColor: '#eee'
            }}></div>
            <div style={{
                borderRadius: 20,
                paddingLeft: 20,
                fontWeight: 'bold',
                fontSize: 20,
                paddingTop: 20
            }}>评论</div>
            {
                generateCommentList()
            }
        </div>
    )
}