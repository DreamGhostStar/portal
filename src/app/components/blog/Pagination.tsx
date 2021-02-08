import React, { useState, useEffect, useContext } from 'react'
import store from '../../../redux/store'
import { Provider } from 'react-redux'
import PaginationItem_container from '../../../containers/PaginationItem_container'
import { error, IconFont, info } from '../common/config'
import 'app/styles/blog/pagination.scss'
import { get_pages_api } from 'app/http/blog'
import { isSuccess } from '../common/utils'
import { SiderContext } from 'app/pages/BlogPage'

const stylePrefix = 'blog-pagination'

export default function Pagination(props: any) {
    const articleContext = useContext(SiderContext)
    const [pages, setPages] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    useEffect(() => {
        store.subscribe(() => { // 监听redux变化
            let obj = store.getState();
            setCurrentPage(obj.page)
        })
        getPages()
    }, [])
    // 获取总页数
    const getPages = async () => {
        const res = await get_pages_api({ type: articleContext.index })
        if (isSuccess(res.code)) {
            setPages(res.data)
        } else {
            error(res.message)
        }
    }
    // 处理分页item传递的数据
    const handlePaginationItemData = (index: number) => {
        setCurrentPage(index)
    }
    // 点击后退按钮当前页数减一
    const retreatOnePage = () => {
        if (currentPage === 1) {
            info('当前已是第一页，不可后退！');
            return;
        }
        setCurrentPage(currentPage - 1)

        props.transfrom_currentPage(currentPage - 1)
    }
    // 点击前进按钮当前页数加一
    const advanceOnePage = () => {
        if (currentPage === pages) {
            info('当前已是最后一页，不可前进！')
            return;
        }
        setCurrentPage(currentPage + 1)
        props.transfrom_currentPage(currentPage + 1)
    }
    const generatePaginnation = () => {
        let items = [];
        // 添加分页索引
        // 小于5时全部显示
        if (pages <= 5) {
            for (let index = 1; index < pages + 1; index++) {
                items.push(
                    <Provider store={store} key={index - 1}>
                        <PaginationItem_container
                            index={index}
                            handlePaginationItemData={handlePaginationItemData}
                            currentPage={currentPage}
                        />
                    </Provider>
                )
            }
        } else {
            for (let index = 1; index <= pages - 1; index++) {
                if (currentPage >= 4) {
                    if (index === currentPage) {
                        items.push(
                            <IconFont
                                type='anticonshenglve'
                                className={`${stylePrefix}-omit-icon`}
                                key={6}
                            />
                        )
                        items.push(
                            <Provider store={store} key={index - 1}>
                                <PaginationItem_container
                                    index={index}
                                    handlePaginationItemData={handlePaginationItemData}
                                    currentPage={currentPage}
                                />
                            </Provider>
                        )
                    } else if (index > currentPage) {
                        continue;
                    } else if (index <= 3) {
                        // 只输出前三个分页索引
                        items.push(
                            <Provider store={store} key={index - 1}>
                                <PaginationItem_container
                                    index={index}
                                    handlePaginationItemData={handlePaginationItemData}
                                    currentPage={currentPage}
                                />
                            </Provider>
                        )
                    }
                }
                else {
                    if (index <= 3) {
                        items.push(
                            <Provider store={store} key={index - 1}>
                                <PaginationItem_container
                                    index={index}
                                    handlePaginationItemData={handlePaginationItemData}
                                    currentPage={currentPage}
                                />
                            </Provider >
                        )
                    }
                }
            }
            // 省略号
            items.push(
                <IconFont
                    type='anticonshenglve'
                    className={`${stylePrefix}-omit-icon`}
                    key={8}
                />
            )
            // 添加最后一页索引分页
            items.push(
                <Provider store={store} key={7}>
                    <PaginationItem_container
                        index={pages}
                        handlePaginationItemData={handlePaginationItemData}
                        currentPage={currentPage}
                    />
                </Provider >
            )
        }
        return items
    }
    return (
        <div className={`removeFloat ${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-main`}>
                {
                    pages !== 1 && <IconFont
                        type='anticonqianjin-copy'
                        className={`${stylePrefix}-go-icon`}
                        onClick={retreatOnePage}
                    />
                }
                {/* 生成分页列表数据 */}
                {
                    generatePaginnation()
                }
                {
                    pages !== 1 && <IconFont
                        type='anticonqianjin'
                        className={`${stylePrefix}-go-icon`}
                        onClick={advanceOnePage}
                    />
                }
            </div>
        </div>
    )
}