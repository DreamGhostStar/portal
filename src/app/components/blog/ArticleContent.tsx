import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import '../../styles/blog/articleContent.scss'
import { Modal, Button } from 'antd';
import avatorURL from '../../../images/profile photo.jpg'
import store from '../../../redux/store';
import { error, IconFont } from '../common/config';
import { getReduxUser, simpleFormatTime } from '../common/utils';
import AvatarShow from '../common/AvatarShow';
import { ArticleItemConfig } from './LayoutContent';

const stylePrefix = 'blog-articleContent'

interface ArticleContentConfig {
    item: ArticleItemConfig,
    articleID: number,
    deleteAssignArticle: any
    allowEdit?: boolean
}

export default function ArticleContent({ item, articleID, deleteAssignArticle, allowEdit = true }: ArticleContentConfig) {
    let history = useHistory()
    const [lineWidth, setLineWidth] = useState(0)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const titleRef = useRef(null)

    // 链接跳转到增加文章的页面
    const handleAdd = () => {
        const user = getReduxUser();
        if (!user) {
            error('当前未处于登陆状态，请登录重试')
            return;
        }
        history.push(`/edit/undefiend`);
    }

    const handleEdit = () => {
        const user = getReduxUser();
        if (!user) {
            error('当前未处于登陆状态，请登录重试')
            return;
        }

        let { articleID } = item;
        history.push(`/edit/${articleID}`);
    }

    // 以下三个函数均是模态框相关函数（删除）
    const showModal = () => {
        if (!store.getState().user) {
            error('当前处于未登录状态，请登录重试')
            return;
        }

        setVisible(true)
    };

    const handleOk = () => {
        setLoading(true)
        // 传递index（索引）给LayoutContent，以便删除
        deleteAssignArticle(articleID, item.title);
        setLoading(false)
        setVisible(false)
    };

    return (
        <div className={`${stylePrefix}-layout`}>
            <a
                className={`${stylePrefix}-title`}
                ref={titleRef}
                onMouseOver={() => { setLineWidth((titleRef.current as any).offsetWidth) }}
                onMouseOut={() => { setLineWidth(0) }}
                onClick={() => { history.push(`/blog/${articleID}`) }}
            >
                {item.title}
            </a>
            <div
                style={{
                    width: (lineWidth),
                }}
                className={`${stylePrefix}-line`}
            ></div>
            {
                allowEdit && <div className={`${stylePrefix}-icon-layout`}>
                    <IconFont type="anticonzengjia" className={`${stylePrefix}-icon`} onClick={() => handleAdd()} />
                    <IconFont type="anticonxiugai" className={`${stylePrefix}-icon`} onClick={() => handleEdit()} />
                    <IconFont type="anticonshanchu" className={`${stylePrefix}-icon`} onClick={showModal} />
                </div>
            }
            <div className={`${stylePrefix}-info-layout`}>
                <div>
                    <AvatarShow src={avatorURL} size={48} userID={item.author.id} />
                </div>
                <div>
                    <div className={`${stylePrefix}-word`}>
                        {item.author['nickname']}
                    </div>
                    <div className={`${stylePrefix}-word`}>
                        {simpleFormatTime(item.createTime)}
                    </div>
                </div>
            </div>
            <div className={`${stylePrefix}-content`}>
                {item.abstract}
            </div>
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
                <p>{`确认删除《${item.title}》？`}</p>
            </Modal>
        </div >
    )
}