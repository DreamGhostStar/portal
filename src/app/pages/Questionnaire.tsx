import React from 'react'
import backImg from '../../images/questionBack.jpg'
import QuestionContent from '../components/writeQuestion/QuestionContent'
import staticData from 'static/questionContent.json'

export default function Questionnaire() {
    return (
        <>
            <div style={{
                position: 'relative',
                zIndex: 99,
                margin: '0 auto'
            }}>
                <div style={{
                    textAlign: 'center',
                    fontSize: 40,
                    paddingTop: 30,
                    paddingBottom: 30,
                    color: '#fff'
                }}>
                    {staticData.title}
                </div>
                <div style={{
                    textAlign: 'center',
                    fontSize: 20,
                    paddingBottom: 30
                }}>
                    创作者：{staticData.author}
                </div>
                <QuestionContent questionContent={staticData.content} />
            </div>
            <div style={{
                backgroundImage: `url(${backImg})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover',
                position: 'fixed',
                top: 0,
                bottom: 0,
                width: '100%',
                height: '100%'
            }}>
            </div>
        </>
    )
}