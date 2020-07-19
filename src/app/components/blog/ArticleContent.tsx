import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'
import '../../styles/blog/blogSider.scss'
import { Modal, Button } from 'antd';
import avatorURL from '../../../images/profile photo.jpg'
import store from '../../../redux/store';
import { error, IconFont } from '../common/config';
import { getReduxUser, simpleFormatTime } from '../common/utils';

interface ArticleContentConfig {
    item: any, 
    articleID: number, 
    deleteAssignArticle: any
}

export default function ArticleContent({ item, articleID, deleteAssignArticle }: ArticleContentConfig) {
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
        <div style={{
            backgroundColor: '#fff',
            borderBottom: '1px solid #DDDDDD',
            height: 200,
            position: 'relative'
        }}>
            <a
                style={{
                    fontSize: 30,
                    marginLeft: 30,
                    color: '#000'
                }}
                ref={titleRef}
                onMouseOver={() => { setLineWidth((titleRef.current as any).offsetWidth) }}
                onMouseOut={() => { setLineWidth(0) }}
                onClick={() => { history.push(`/blog/${articleID}`) }}
            >
                {item.title}
            </a>
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
                }} onClick={() => handleAdd()} />
                <IconFont type="anticonxiugai" style={{
                    fontSize: 20,
                    marginRight: 19
                }} onClick={() => handleEdit()} />
                <IconFont type="anticonshanchu" style={{
                    fontSize: 20,
                    marginRight: 19
                }} onClick={showModal} />
            </div>
            <div style={{
                marginLeft: 30,
                marginTop: 10
            }} className="removeFloat">
                <img src={avatorURL} alt="头像" width={48} height={48} style={{
                    borderRadius: '50%',
                    float: 'left'
                }} />
                <div style={{
                    marginLeft: 30,
                    float: 'left',
                    color: 'grey'
                }}>
                    {item.author['nickname']}
                </div>
                <br />
                <div style={{
                    marginLeft: 30,
                    float: 'left',
                    color: 'grey'
                }}>
                    {simpleFormatTime(item.createTime)}
                </div>
            </div>
            <div style={{
                marginTop: 5,
                marginLeft: 25
            }}>
                {item.content}
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
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} style={{
                        backgroundColor: '#f00',
                        border: '1px solid #f00'
                    }}>
                        删除
                    </Button>,
                ]}
            >
                <p>{`确认删除《${item.title}》？`}</p>
            </Modal>
        </div >
    )
}