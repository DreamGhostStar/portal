import React, { useState, useEffect } from 'react'
import ArticleContentContainer from '../../../containers/ArticleContent_container'
import BlogSider_container from '../../../containers/BlogSider_container'
import '../../styles/blog/layoutContent.scss'
import { Empty, Button } from 'antd';

import store from '../../../redux/store'
import { Provider } from 'react-redux'
import { _getBlog, _deleteArticle } from '../common/Api';
import { success, error } from '../common/config';
import Loading2 from '../common/Loading2';

import articleList from 'model/artileList.json' // TODO: 需删除

export default function LayoutContent({ }) {
    const [article, setArticle] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        store.subscribe(() => { // 监听redux变化
            let obj = store.getState();
            setLoading(true)

            getBlog(obj.type + 1, obj.page);
        })
        getBlog(store.getState().type + 1, store.getState().page);
    }, [])
    // 获取列表文章接口
    const getBlog = async (tempType: number, tempPage: number) => {
        // TODO: 与后端对接
        setArticle(articleList)
        setLoading(false)
        // const res = await _getBlog({
        //     type: tempType,
        //     page: tempPage
        // });

        // if (res) {
        //     if (res.data.code === 0) {
        //         if (res.data.data.article.length === 0) {
        //             setArticle([])
        //             setLoading(false)
        //         } else {
        //             setArticle(res.data.data.article)
        //             setPage(tempPage)
        //             setLoading(false)
        //         }
        //     }
        // }
    }
    // 删除文章文章接口
    const deleteArticle = async (articleID: number, deleteTitle: string) => {
        const res = await _deleteArticle({
            articleID
        });

        if (res) {
            if (res.data.code === 0) {
                success(`《${deleteTitle}》删除成功`)

                // 重新请求列表文章
                let obj = store.getState();
                getBlog(obj.type + 1, obj.page)
            } else {
                error(res.data.message)
            }
        }
    }
    const judgeShowLoading = () => {
        if (loading) {
            return <Loading2 />
        } else {
            let emptyState = [];

            if (article.length === 0) {
                emptyState.push(
                    <Empty
                        key={1}
                        image="https://gw.alipayobjects.com/mdn/miniapp_social/afts/img/A*pevERLJC9v0AAAAAAAAAAABjAQAAAQ/original"
                        imageStyle={{
                            height: 60,
                        }}
                        description={
                            <span>
                                暂无数据
                            </span>
                        }
                    >
                        <Button type="primary">新增文章</Button>
                    </Empty>
                )
            }

            return <>
                {
                    article.map((item, index) => {
                        return (
                            <Provider store={store} key={index}>
                                <ArticleContentContainer
                                    item={item}
                                    deleteAssignArticle={deleteArticle}
                                    articleID={item.articleID}
                                />
                            </Provider>
                        )
                    })
                }
                {
                    emptyState
                }
            </>
        }
    }
    return (
        <div className="layoutContent">
            <Provider store={store}>
                <BlogSider_container />
            </Provider>
            <div
                style={{
                    height: (loading ? 400 : 'auto'),
                    backgroundColor: (loading ? '#fff' : 'transparent')
                }}
                className='layoutContent_show'
            >
                {
                    judgeShowLoading()
                }
            </div>
        </div>
    )
}