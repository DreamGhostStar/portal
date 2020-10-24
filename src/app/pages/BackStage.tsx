import React, { useState } from 'react'
import BlogHeader from 'app/components/blog/BlogHeader'
import 'app/styles/page/backStage.scss'
import BackGround from 'app/components/common/BackGround'
import staticNav from 'static/backNav.json'
import { useHistory, useParams } from 'react-router-dom'
import Activity from 'app/components/back/Activity'
import ActivityDetail from 'app/components/back/ActivityDetail'
import UserList from 'app/components/back/UserList'
import QuestionList from 'app/components/back/QuestionList'
import { isMobile } from 'app/components/common/utils'
import HintMessagePage from './HintMessagePage'

const stylePrefix = 'page-back'

interface BackRouterConfig {
    type: string
    id: string
}

export default function BackStage() {
    const history = useHistory()
    const params = useParams<BackRouterConfig>()
    const [activeIndex, setActiveIndex] = useState(0)
    const [mouseIndex, setMouseIndex] = useState<null | number>(null)
    const handleClickNav = (index: number) => {
        const contrast = {
            0: 'activity',
            1: 'user',
            2: 'questionNaire'
        }
        history.push(`/back/${contrast[index]}/list`)
        setActiveIndex(index)
    }
    const judgeShowMain = () => {
        switch (params.type) {
            case 'activity':
                if (params.id === 'list') {
                    return <Activity />
                }
                return <ActivityDetail id={Number(params.id)} />
            case 'user':
                return <UserList />
            case 'questionNaire':
                if (params.id === 'list') {
                    return <QuestionList />
                }
        }
    }
    return (
        isMobile()
            ? <HintMessagePage />
            : <>
                <BlogHeader activeIndex={null} />
                <div className={`${stylePrefix}-header`}>
                    <div className={`${stylePrefix}-title`}>
                        TECHF5VE 后台管理
            </div>
                    <div className={`${stylePrefix}-nav`}>
                        {
                            staticNav.map((nav, index) => {
                                return <div
                                    className={`${stylePrefix}-word`}
                                    key={index}
                                    onMouseOver={() => setMouseIndex(index)}
                                    onMouseOut={() => setMouseIndex(null)}
                                    style={{
                                        borderBottom: (activeIndex === index || mouseIndex === index ? '2px solid #00CCFF' : 'none'),
                                        color: (activeIndex === index ? '#00CCFF' : '#000')
                                    }}
                                    onClick={() => { handleClickNav(index) }}
                                >
                                    {nav}
                                </div>
                            })
                        }
                    </div>
                </div>
                {
                    judgeShowMain()
                }
                <BackGround />
            </>
    )
}
