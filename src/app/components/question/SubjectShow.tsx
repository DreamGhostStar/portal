import React from 'react'
import EditMultiline from './EditMultiline';
import EditCheckBox from './EditCheckBox';

import 'app/styles/question/subjectShow.scss'
import { subjectItemConfig } from './CreateQuestionContent';
const stylePrefix = 'question-subjectShow'

interface SubjectShowConfig {
    addSubjectList: subjectItemConfig[],
    handleInputData: any,
    isSubmit: boolean
}

export default function SubjectShow({ addSubjectList, handleInputData, isSubmit }: SubjectShowConfig) {
    return (
        <>
            {
                addSubjectList.map((item, index) => {
                    if (item.type === 'text') {
                        return <div className={`${stylePrefix}-single-layout `} key={index}>
                            <EditMultiline
                                index={item.index}
                                key={index}
                                handleInputData={handleInputData}
                                isSubmit={isSubmit}
                                item={item}
                            />
                        </div>
                    } else {
                        return <div className={`${stylePrefix}-single-layout `} key={index}>
                            <EditCheckBox
                                index={item.index}
                                handleInputData={handleInputData}
                                isSubmit={isSubmit}
                                subjectItem={item}
                            />
                        </div>
                    }
                })
            }
        </>
    )
}