import React, { useState, useEffect } from 'react'
import Header from '../components/blog/BlogHeader'
import ArticleShow from '../components/blog/ArticleShow'
import '../styles/page/blogPage.scss'
import PaginationContainer from '../../containers/Pagination_container'
import LayoutContentContainer from '../../containers/LayoutContent_container'
import store from '../../redux/store'
import { Provider } from 'react-redux'

export default function BlogPage(props: any) {
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const monitor = (e: any) => {
        const tempScreenWidth = e.target.innerWidth;
        setScreenWidth(tempScreenWidth)
    }

    // 判断显示文章列表还是具体文章
    const judgeArticle = (articleID: string) => {
        if (articleID === 'undefined') {
            return (
                <Provider store={store}>
                    <LayoutContentContainer />
                </Provider>
            )
        } else {
            return <ArticleShow articleID={parseInt(articleID)} />
        }
    }

    // 判断是否显示分页器
    const judgeShowPagination = (articleID: string) => {
        if (articleID === 'undefined') {
            return (
                <Provider store={store}>
                    <PaginationContainer />
                </Provider>
            )
        }
    }

    // 事件监听，如果屏幕大小改变，立即改变screenWidth，并且触发媒体查询
    useEffect(() => {
        window.addEventListener('resize', monitor);
        return () => {
            window.removeEventListener('resize', monitor);
        }
    }, [])
    const articleID = props.match.params.articleID;
    return (
        <>
            <div style={{
                position: 'relative',
                zIndex: 99
            }}>
                <Header activeIndex={1} />
                <div className='blogPage'>
                    {
                        judgeArticle(articleID)
                    }
                </div>
                {
                    judgeShowPagination(articleID)
                }
                <div style={{
                    height: 40
                }}></div>
            </div>
            <div style={{
                backgroundColor: '#eee',
                backgroundSize: 'cover',
                position: 'fixed',
                top: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }}>
            </div>
        </>
    )
}