import React, { useState, useEffect } from 'react'
import store from '../../../redux/store'
import { Provider } from 'react-redux'
import PaginationItem_container from '../../../containers/PaginationItem_container'
import staticData from 'static/articleContentList.json'
import { IconFont, info } from '../common/config'
import 'app/styles/blog/pagination.scss'

const stylePrefix = 'blog-pagination'

export default function Pagination(props: any) {
    const [pages, setPages] = useState(staticData.pages) // TODO: 需要获取后端分页数量的数据
    const [currentPage, setCurrentPage] = useState(1)
    const [type, setType] = useState(0)
    const [isMouse, setIsMouse] = useState(new Array(2).fill(false))
    useEffect(() => {
        store.subscribe(() => { // 监听redux变化
            let obj = store.getState();

            if (obj.type !== type) {
                setCurrentPage(obj.page)
                setType(obj.type)
            } else {
                setCurrentPage(obj.page)
            }
        })
    }, [])
    // 处理分页item传递的数据
    const handlePaginationItemData = (index: number) => {
        setCurrentPage(index)
    }
    const handleMosueOver = (index: number) => {
        let tempIsMouse = new Array(2).fill(false);
        tempIsMouse[index] = true;
        setIsMouse(tempIsMouse)
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
                    <IconFont
                        type='anticonshenglve'
                        className={`${stylePrefix}-omit-icon`}
                        key={6}
                    />
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
                <IconFont
                    type='anticonqianjin-copy'
                    style={{
                        border: (isMouse[0] ? '1px solid #00CCFF' : '1px solid #ddd'),
                        color: (isMouse[0] ? '#00CCFF' : '#000'),
                    }}
                    className={`${stylePrefix}-go-icon`}
                    onMouseOver={() => handleMosueOver(0)}
                    onMouseOut={() => { new Array(2).fill(false) }}
                    onClick={retreatOnePage}
                />
                {/* 生成分页列表数据 */}
                {
                    generatePaginnation()
                }
                <IconFont
                    type='anticonqianjin'
                    style={{
                        border: (isMouse[1] ? '1px solid #00CCFF' : '1px solid #ddd'),
                        color: (isMouse[1] ? '#00CCFF' : '#000'),
                    }}
                    className={`${stylePrefix}-go-icon`}
                    onMouseOver={() => handleMosueOver(1)}
                    onMouseOut={() => { setIsMouse(new Array(2).fill(false)) }}
                    onClick={advanceOnePage}
                />
            </div>
        </div>
    )
}
// componentWillReceiveProps(nextProps) {
//     var data;

//     if (typeof nextProps.data === 'number') {
//         data = nextProps.data;
//     }

//     if (data) {
//         this.handlePaginationItemData(data - 1);
//     }
// }