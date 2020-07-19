import React from 'react'
import EditSingle from './EditSIngle'
import EditRadio from './EditRadio'
import EditMultiline from './EditMultiline';
import EditCheckBox from './EditCheckBox';

import 'app/styles/question/subjectShow.scss'
const stylePrefix = 'question-subjectShow'

interface SubjectShowConfig {
    addSubjectList: any,
    handleInputData: any,
    isSubmit: boolean
}

export default function SubjectShow({ addSubjectList, handleInputData, isSubmit }: SubjectShowConfig) {
    return (
        <>
            {
                addSubjectList.map((item: any, index: number) => {
                    var temp;
                    switch (item.type) {
                        case 'radio':
                            temp = <div className={`${stylePrefix}-single-layout `} key={index}>
                                <EditRadio
                                    index={item.index}
                                    // title={item.title}
                                    // options={item.options}
                                    handleInputData={handleInputData}
                                    item={item}
                                    isSubmit={isSubmit}
                                />
                            </div>
                            break;
                        case 'checkBox':
                            temp = <div className={`${stylePrefix}-single-layout `} key={index}>
                                <EditCheckBox
                                    index={item.index}
                                    // title={item.title}
                                    // options={item.options}
                                    handleInputData={handleInputData}
                                    isSubmit={isSubmit}
                                    item={item}
                                />
                            </div>
                            break;
                        case 'multiline':
                            temp = <div className={`${stylePrefix}-single-layout `} key={index}>
                                <EditMultiline
                                    index={item.index}
                                    // title={item.title}
                                    key={index}
                                    handleInputData={handleInputData}
                                    isSubmit={isSubmit}
                                    item={item}
                                />
                            </div>
                            break;
                        case 'singleText':
                            temp = <div className={`${stylePrefix}-single-layout `} key={index}>
                                <EditSingle
                                    index={item.index}
                                    // title={item.title}
                                    key={index}
                                    handleInputData={handleInputData}
                                    isSubmit={isSubmit}
                                    item={item}
                                />
                            </div>
                            break;
                        default:
                            break;
                    }
                    return temp;
                })
            }
        </>
    )
}