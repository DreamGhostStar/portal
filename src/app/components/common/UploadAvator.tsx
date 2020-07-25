import React, { useState, useEffect } from 'react'
import { Upload } from 'antd'
import { PlusOutlined } from '@ant-design/icons';
import { _getPictureToken } from './Api';
import { error, BASE_QINIU_URL, QINIU_SERVER } from './config';
import '../../styles/comon/uploadAvator.scss'

interface UploadAvatorConfig {
    img: string,
    saveImg: any
}

export default function UploadAvator({ img, saveImg }: UploadAvatorConfig) {
    const [fileList, setFileList] = useState<any[]>([])
    const [imgURL, setImgURL] = useState(img)
    const [token, setToken] = useState('')
    const [uploadProps, setUploadProps] = useState({})

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


    const handleChange = ({ file, fileList }: { file: any, fileList: any[] }) => {
        console.log(file);
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
            setImgURL(fileItem.url)

            saveImg(fileItem.url) // 将图片路径传回父组件
        }
        setFileList(fileList)
    }

    useEffect(() => {
        getPictureToken()
    }, [])

    useEffect(() => {
        const tempUploadProps = {
            action: QINIU_SERVER,
            data: {
                token: token
            },
            listType: 'picture-card',
            className: 'upload-list-inline',
            showUploadList: false,
            fileList,
            onChange: handleChange
        }
        setUploadProps(tempUploadProps)
    }, [token])

    return (
        <Upload {...uploadProps} className='ant-upload'>
            {
                imgURL
                    ? <img src={imgURL} alt="avator" className='uploadAvator' />
                    : <div>
                        <PlusOutlined />
                        {/* {loading ? <LoadingOutlined /> : <PlusOutlined />} */}
                        <div className="ant-upload-text">Upload</div>
                    </div>
            }
            <div className='upload_shadow'>
                更换头像
            </div>
        </Upload>
    )
}
