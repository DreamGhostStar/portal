import React, { createContext, useEffect, useState } from 'react'
import Header from '../components/blog/BlogHeader'
import ArticleShow from '../components/blog/ArticleShow'
import '../styles/page/blogPage.scss'
import PaginationContainer from '../../containers/Pagination_container'
import LayoutContentContainer from '../../containers/LayoutContent_container'
import store from '../../redux/store'
import { Provider } from 'react-redux'
import BackGround from 'app/components/common/BackGround'
import { setRemUnit } from 'app/components/common/utils'

const stylePrefix = 'page-blog'
interface IArticleMenuContext {
    index: number;
    onClick?: React.Dispatch<React.SetStateAction<number>>;
}

export const SiderContext = createContext<IArticleMenuContext>({ index: 0 })
export default function BlogPage(props: any) {
    const [siderIndex, setSiderIndex] = useState(0)
    const monitor = () => {
        setRemUnit()
    }
    const menuContext: IArticleMenuContext = {
        index: siderIndex,
        onClick: setSiderIndex,
    }
    // 判断显示文章列表还是具体文章
    const judgeArticle = (articleID: string) => {
        if (articleID === 'undefined') {
            return (
                <SiderContext.Provider value={menuContext} >
                    <Provider store={store}>
                        <LayoutContentContainer />
                    </Provider>
                </SiderContext.Provider>
            )
        } else {
            return (
                <SiderContext.Provider value={menuContext} >
                    <ArticleShow articleID={parseInt(articleID)} />
                </SiderContext.Provider>
            )
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
        setRemUnit()
        return () => {
            window.removeEventListener('resize', monitor);
        }
    }, [])
    const articleID = props.match.params.articleID;
    return (
        <>
            <div className={`${stylePrefix}-layout`}>
                <SiderContext.Provider value={menuContext}>
                    <Header activeIndex={0} />
                </SiderContext.Provider>
                <div className={`${stylePrefix}-main`}>
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
            <BackGround />
        </>
    )
}