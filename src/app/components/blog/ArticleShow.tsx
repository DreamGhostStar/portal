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
import 'app/styles/blog/markdown.scss'
import { simpleFormatTime } from '../common/utils';

import articleDetail from 'model/articleDetail.json'
import Loading2 from '../common/Loading2';

const stylePrefix = 'blog-articleShow'

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
    const [articleLoading, setArticleLoading] = useState(false)
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

    // 删除文章
    const deleteArticle = async (articleID: number, deleteTitle: string) => {
        console.log(articleID)
        // const res = await _deleteArticle({
        //     articleID
        // });

        // if (res) {
        //     if (res.data.code === 0) {
        //         success(`《${deleteTitle}》删除成功`)
        //         history.push('/blog')
        //     } else {
        //         error(res.data.message)
        //     }
        // }
    }

    // 获取文章详细信息接口
    const getAricleDetail = async () => {
        setArticleLoading(true)
        setArticle(articleDetail)
        setTimeout(() => {
            setArticleLoading(false)
        }, 1000);
        // const res = await _getArticleDetail({
        //     articleID
        // });

        // if (res) {
        //     if (res.data.code === 0) {
        //         setArticle(res.data.data)
        //     } else {
        //         error(res.data.message)
        //     }
        // }
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            <Provider store={store}>
                <BlogSiderContainer />
            </Provider>
            <div className={`${stylePrefix}-main-layout`}>
                {
                    articleLoading
                        ? <div style={{
                            height: 400
                        }}>
                            <Loading2 />
                        </div>
                        : article &&
                        <div className={`${stylePrefix}-main`}>
                            <span
                                className={`${stylePrefix}-title`}
                                ref={titleRef}
                                onMouseOver={() => { setLineWidth((titleRef.current as any).offsetWidth) }}
                                onMouseOut={() => { setLineWidth(0) }}
                                onClick={() => { history.push(`/blog/undefined`) }}
                            >
                                {article.title}
                            </span>
                            <div
                                style={{
                                    width: (lineWidth),
                                }}
                                className={`${stylePrefix}-line`}
                            ></div>
                            <div className={`${stylePrefix}-icon-layout`}>
                                <IconFont type="anticonzengjia" className={`${stylePrefix}-icon`} onClick={() => { history.push("/edit/undefiend") }} />
                                <IconFont type="anticonxiugai" className={`${stylePrefix}-icon`} />
                                <IconFont type="anticonshanchu" className={`${stylePrefix}-icon`} onClick={() => { setVisible(true) }} />
                            </div>
                            <div className={`${stylePrefix}-info-layout`}>
                                <img src={avatar} alt="头像" className={`${stylePrefix}-avatar`} />
                                <div className={`${stylePrefix}-author`}>
                                    {article.author}
                                </div>
                                <br />
                                <div className={`${stylePrefix}-createTime`}>
                                    {simpleFormatTime(article.createTime)}
                                </div>
                            </div>
                            <div
                                className={`for-preview for-markdown-preview ${stylePrefix}-content`}
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
                                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} className={`${stylePrefix}-remove-btn`}>
                                        删除
                           </Button>,
                                ]}
                            >
                                <p>{`确认删除《${article.title}》？`}</p>
                            </Modal>
                            <CommentShow articleID={articleID} />
                        </div >
                }
            </div>
        </div>
    )
}