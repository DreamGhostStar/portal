import React, { useState, useEffect, useRef } from 'react'
import Editor from 'for-editor'
import marked from 'marked'
import TitleInput from '../components/writeArticle/TitleInput'
import { _addArticle } from '../components/common/Api'
import '../styles/page/editArticlePage.scss'
import EditHeader from '../components/common/Header'
import EditSider from '../components/writeArticle/EditSider'
import { abstractLength, error, success } from '../components/common/config'
import UploadMarkdownImg from '../components/common/UploadMarkdownImg'
import { _getArticleDetail } from '../components/common/Api'

import articleDetail from 'model/articleDetail.json'
import { isMobile, isSuccess } from 'app/components/common/utils'
import HintMessagePage from './HintMessagePage'
import { add_blog_api, get_blog_detail_api } from 'app/http/blog'
import { useHistory } from 'react-router-dom'

export default function EditArticlePage(props: any) {
    const history = useHistory()
    const [value, setValue] = useState('')
    const [title, setTitle] = useState('')
    const [headerTitle, setHeaderTitle] = useState('新建文章')
    const [articleAbstract, setArticleAbStract] = useState('')
    const $vm = useRef(null)
    useEffect(() => {
        const tempArticleID = props.match.params.articleID;
        if (tempArticleID !== 'undefiend') {
            getArticleDetail(tempArticleID)
            setHeaderTitle('编辑文章')
        } else {
            setHeaderTitle('新建文章')
        }
    }, [])
    // 获取文章详情接口
    const getArticleDetail = async (articleID: number) => {
        setTitle(articleDetail.title)
        setValue(articleDetail.content)
        setArticleAbStract(articleDetail.abstract)
        const res = await get_blog_detail_api({
            articleID
        });

        if (res) {
            if (isSuccess(res.code)) {
                // 填充数据
                setTitle(res.data.title)
                setValue(res.data.content)
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
        const html = marked(value);
        let frontHtml = abstract

        if (!abstract) {
            var reg = new RegExp('<[^<>]+>', 'g');
            var text = html.replace(reg, "");

            frontHtml = text.replace(/\s/g, ' ')
        }

        // TODO: 等后端改了后，前端将摘要传过去
        addArticle(title, value, type + 1, frontHtml.slice(0, abstractLength))
    }

    // 增加文章接口
    const addArticle = async (title: string, content: string, type: number, abstract: string) => {
        const res = await add_blog_api({
            title,
            content,
            type,
            abstract
        });

        if (res) {
            if (isSuccess(res.code)) {
                success('新建文章成功')
                history.push(`/blog/list`);
            } else {
                error(res.message)
            }
        }
    }
    return (
        isMobile()
            ? <HintMessagePage />
            : <div className='background'>
                <EditHeader title={headerTitle} />
                <div className='content'>
                    <div>
                        <TitleInput
                            title={title}
                            saveTitle={(tempTitle: string) => setTitle(tempTitle)}
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
                                onChange={tempValue => setValue(tempValue)}
                                onSave={(tempValue) => handleSave(tempValue)}
                            />
                            <UploadMarkdownImg saveImg={addImg} />
                        </div>
                    </div>
                    <EditSider
                        handleClick={handleClick}
                        abstract={articleAbstract}
                        setArticleAbStract={setArticleAbStract}
                    />
                </div>
            </div>
    )
}