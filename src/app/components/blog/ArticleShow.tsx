/* 
 * 文章详细信息页
*/
import React, { useState, useRef, useEffect } from 'react'
import BlogSiderContainer from '../../../containers/BlogSider_container'
import { useHistory } from 'react-router-dom'

import { Modal, Button } from 'antd';
import { error, success, IconFont } from '../common/config'

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import JoinButton from './JoinButton';
import CommentShow from './comment/CommentShow';
import avatarURL from '../../../images/profile photo.jpg'
import { _getArticleDetail, _deleteArticle } from '../common/Api';
// import 'highlight.js/styles/github.css';

import '../../styles/blog/articleShow.scss'
import { simpleFormatTime } from '../common/utils';

interface ArticleShowConfig {
    articleID: number
}

export default function ArticleShow({ articleID }: ArticleShowConfig) {
    let history = useHistory();
    const [lineWidth, setLineWidth] = useState(0)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [article, setArticle] = useState<any>(null)
    const [avatar, setAvatar] = useState(avatarURL)
    const titleRef = useRef(null)

    useEffect(() => {
        getAricleDetail()
    }, [])
    useEffect(() => {
        if (article) {
            setAvatar(article.avator)
        }
    }, [article])
    const handleOk = () => {
        setLoading(true)
        deleteArticle(articleID, article.title);
        setLoading(false)
        setVisible(false)
    };

    const deleteArticle = async (articleID: number, deleteTitle: string) => {
        const res = await _deleteArticle({
            articleID
        });

        if (res) {
            if (res.data.code === 0) {
                success(`《${deleteTitle}》删除成功`)
                history.push('/blog')
            } else {
                error(res.data.message)
            }
        }
    }

    // 获取文章详细信息接口
    const getAricleDetail = async () => {
        const res = await _getArticleDetail({
            articleID
        });

        if (res) {
            if (res.data.code === 0) {
                setArticle(res.data.data)
            } else {
                error(res.data.message)
            }
        }
    }
    return (
        <div className='articleShow'>
            <Provider store={store}>
                <BlogSiderContainer />
            </Provider>
            <div style={{
                float: 'right',
                width: 900
            }}>
                <div style={{
                    backgroundColor: '#fff',
                    borderBottom: '1px solid #DDDDDD',
                    position: 'relative'
                }}>
                    <span
                        style={{
                            fontSize: 30,
                            marginLeft: 30,
                            color: '#000',
                            cursor: 'pointer'
                        }}
                        ref={titleRef}
                        onMouseOver={() => { setLineWidth((titleRef.current as any).offsetWidth) }}
                        onMouseOut={() => { setLineWidth(0) }}
                        onClick={() => { history.push(`/blog/undefined`) }}
                    >
                        {article.title}
                    </span>
                    <div style={{
                        height: 2,
                        width: (lineWidth),
                        backgroundColor: '#CCCCCC',
                        marginLeft: 30,
                        transitionDuration: '.3s'
                    }}></div>
                    <div style={{
                        position: 'absolute',
                        top: 20,
                        right: 20
                    }}>
                        <IconFont type="anticonzengjia" style={{
                            fontSize: 20,
                            marginRight: 19
                        }} onClick={() => { history.push("/edit/undefiend") }} />
                        <IconFont type="anticonxiugai" style={{
                            fontSize: 20,
                            marginRight: 19
                        }} />
                        <IconFont type="anticonshanchu" style={{
                            fontSize: 20,
                            marginRight: 19
                        }} onClick={() => { setVisible(true) }} />
                    </div>
                    <div style={{
                        marginLeft: 30,
                        marginTop: 10
                    }}>
                        <img src={avatar} alt="头像" width={48} height={48} style={{
                            borderRadius: '50%',
                            float: 'left'
                        }} />
                        <div style={{
                            marginLeft: 30,
                            float: 'left',
                            color: 'grey'
                        }}>
                            {article.author}
                        </div>
                        <br />
                        <div style={{
                            marginLeft: 30,
                            float: 'left',
                            color: 'grey'
                        }}>
                            {simpleFormatTime(article.createTime)}
                        </div>
                    </div>
                    <div
                        style={{
                            marginTop: 5,
                            marginLeft: 25
                        }}
                        className="for-preview for-markdown-preview"
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    >
                    </div>
                    <JoinButton lastTime={article.time} />
                    <Modal
                        visible={visible}
                        title="删除文章"
                        onOk={handleOk}
                        onCancel={() => { setVisible(false) }}
                        footer={[
                            <Button key="back" onClick={() => { setVisible(false) }}>
                                取消
                            </Button>,
                            <Button key="submit" type="primary" loading={loading} onClick={handleOk} style={{
                                backgroundColor: '#f00',
                                border: '1px solid #f00'
                            }}>
                                删除
                            </Button>,
                        ]}
                    >
                        <p>{`确认删除《${article.title}》？`}</p>
                    </Modal>
                    <CommentShow articleID={articleID} />
                </div >
            </div>
        </div>
    )
}