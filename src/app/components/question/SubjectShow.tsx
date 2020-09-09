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
    setDropIndex: React.Dispatch<React.SetStateAction<number | null>>
    dropIndex: number | null
    swapSubjectItem: (newIndex: number, oldIndex: number) => void
}

export default function SubjectShow({ addSubjectList, handleInputData, isSubmit, setDropIndex, dropIndex, swapSubjectItem }: SubjectShowConfig) {
    return (
        <>
            {
                addSubjectList.map((item, index) => {
                    if (item.type === 'text') {
                        return <div className={`${stylePrefix}-single-layout `} key={index}>
                            <EditMultiline
                                index={index}
                                key={index}
                                handleInputData={handleInputData}
                                isSubmit={isSubmit}
                                item={item}
                                setDropIndex={setDropIndex}
                                dropIndex={dropIndex}
                                swapSubjectItem={swapSubjectItem}
                            />
                        </div>
                    } else {
                        return <div className={`${stylePrefix}-single-layout `} key={index}>
                            <EditCheckBox
                                index={index}
                                handleInputData={handleInputData}
                                isSubmit={isSubmit}
                                subjectItem={item}
                                setDropIndex={setDropIndex}
                                dropIndex={dropIndex}
                                swapSubjectItem={swapSubjectItem}
                            />
                        </div>
                    }
                })
            }
        </>
    )
}