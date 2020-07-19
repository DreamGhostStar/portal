import React from 'react'
import Header from '../components/common/Header'
import CreateQuestionContent from '../components/question/CreateQuestionContent'

export default function CreateQuestionNaire() {
    return (
        <>
            <div style={{
                position: 'relative',
                zIndex: 99,
            }}>
                <Header title='创建问卷'/>
                <CreateQuestionContent />
            </div>
            <div style={{
                backgroundColor: '#eee',
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