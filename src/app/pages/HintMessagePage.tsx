import React, { FC } from 'react'
import 'app/styles/page/hintMessagePage.scss'
import { useHistory } from 'react-router-dom'

const HintMessagePage: FC = () => {
    const history = useHistory()
    return (
        <div className='hintMessage' >
            <div className='main' >
                <h1 className='title' >访问错误</h1>
                <p className='description' >该页面暂不支持手机端访问，请切换为PC端访问</p>
                <button className='btn' onClick={() => history.goBack()} >返回</button>
            </div>
        </div>
    )
}

export default HintMessagePage