import React, { useState, useEffect, useRef } from 'react'
import Editor from 'for-editor'
import marked from 'marked'
import { useHistory } from 'react-router-dom'
import TitleInput from '../components/writeArticle/TitleInput'
import { _addArticle } from '../components/common/Api'
import '../styles/page/editArticlePage.scss'
import EditHeader from '../components/common/Header'
import EditSider from '../components/writeArticle/EditSider'
import { success, error } from '../components/common/config'
import UploadMarkdownImg from '../components/common/UploadMarkdownImg'
import { _getArticleDetail } from '../components/common/Api'

export default function EditArticlePage(props: any) {
    let history = useHistory();
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [articleID, setArticleID] = useState(null)
    const $vm = useRef(null)
    useEffect(() => {
        const tempArticleID = props.match.params.articleID;
        setArticleID(tempArticleID)
        if (tempArticleID !== 'undefiend') {
            getArticleDetail(tempArticleID)
        }
    }, [])
    // 获取列表文章接口
    const getArticleDetail = async (articleID: number) => {
        const res = await _getArticleDetail({
            articleID
        });

        if (res) {
            if (res.data.code === 0) {
                setTitle(res.data.data.title)
                setValue(res.data.data.content)
            } else {
                error(res.data.message)
            }
        }
    }

    const addImg = (imgURL: string) => {
        ($vm.current as any).$img2Url('image', imgURL);
    }

    // 将markdown格式文章解析成html
    const handleSave = (tempValue: string) => {
        let html = marked(tempValue);

        console.log(html);
    }

    const handleClick = (type: number, abstract: string) => {
        let html = marked(value);

        // var reg = new RegExp('<[^<>]+>', 'g');
        // var text = html.replace(reg, "");

        // let abstract = text.replace(/\s/g, ' ')

        // TODO: 等后端改了后，前端将摘要传过去

        addArticle(title, html, type + 1)
    }

    // 增加文章接口
    const addArticle = async (title: string, content: string, type: number) => {
        const res = await _addArticle({
            title,
            content,
            type
        });

        if (res) {
            if (res.data.code === 0) {
                success('新建文章成功')
                history.push(`/createQuestion`);
            } else {
                error(res.data.message)
            }
        }
    }
    return (
        <div className='background'>
            <EditHeader title='新建文章' />
            <div className='content'>
                <div>
                    <TitleInput
                        title={title}
                        saveTitle={(tempTitle: string) => { setTitle(tempTitle) }}
                    />
                    <div style={{
                        height: 600,
                        width: 1000,
                        position: 'relative'
                    }}>
                        <Editor
                            placeholder='编辑文章内容...'
                            ref={$vm}
                            value={value}
                            onChange={tempValue => { setValue(tempValue) }}
                            onSave={(tempValue) => handleSave(tempValue)}
                        />
                        <UploadMarkdownImg saveImg={addImg} />
                    </div>
                </div>
                <EditSider handleClick={handleClick} />
            </div>
        </div>
    )
}