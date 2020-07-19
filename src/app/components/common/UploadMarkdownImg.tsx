import React, { useState, useEffect } from 'react'
import { Upload } from 'antd'
import { _getPictureToken } from './Api';
import { error, BASE_QINIU_URL, QINIU_SERVER, IconFont } from './config';
import '../../styles/comon/uploadMarkdownImg.scss'

interface UploadMarkdownImgConfig {
    saveImg: any
}

export default function UploadMarkdownImg({ saveImg }: UploadMarkdownImgConfig) {
    const [fileList, setFileList] = useState<any[]>([])
    const [token, setToken] = useState('')
    const [uploadProps, setUploadProps] = useState({})

    const handleChange = ({ file, fileList }: { file: any, fileList: any[] }) => {
        const { uid, name, type, thumbUrl, status, response = {} } = file
        const fileItem = {
            uid,
            name,
            type,
            thumbUrl,
            status,
            url: BASE_QINIU_URL + (response.hash || '')
        }
        fileList.pop()
        fileList.push(fileItem)
        if (fileItem.status === 'done') {
            saveImg(fileItem.url) // 将图片路径传回父组件
        }
        setFileList(fileList)
    }

    useEffect(() => {
        getPictureToken()
    }, [])
    useEffect(() => {
        setUploadProps({
            action: QINIU_SERVER,
            data: {
                token: token
            },
            listType: 'picture-card',
            className: 'upload-list-inline',
            showUploadList: false,
            fileList,
            onChange: handleChange
        })
    }, [token])


    const getPictureToken = async () => {
        const res = await _getPictureToken();

        if (res) {
            if (res.data.code === 0) {
                setToken(res.data.data)
            } else {
                error(res.data.message)
            }
        }
    }
    return (
        <Upload {...uploadProps} className='ant-upload'>
            <IconFont type='anticontupian' className='uploadImgIcon' />
        </Upload>
    )
}