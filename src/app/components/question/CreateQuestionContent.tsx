import React, { useState } from 'react'
import { Button, Modal, Radio } from 'antd';
import SubjectShow from './SubjectShow';
import EditQuestionTitle from './EditQuestionTitle';
import { IconFont, error } from '../common/config';
import 'app/styles/question/createQuestionContent.scss'
import { deepCopy } from '../common/utils';
const stylePrefix = 'question-createQuestionContent';

export default function CreateQuestionContent() {
    const [addIsMouse, setAddIsMouse] = useState(false)
    const [visible, setVisible] = useState(false)
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [value, setValue] = useState<number | null>(null)
    const [addSubjectList, setAddSubjectList] = useState([]) // 要传给后端的问卷题目
    const [inputValue, setInputValue] = useState('问卷题目') // 要传给后端的问卷标题
    const [isSubmit, setIsSubmit] = useState(false)// 在对话框中选择不同选项所增加的题目
    // 对话框中单选按钮的变化
    const onChange = (e: any) => {
        setValue(e.target.value)
    };

    // 标题的变化
    const handleChange = (e: any) => {
        setInputValue(e.target.value)
    }
    // 选择增加题目
    const handleOk = () => {
        if (value === null) {
            error('增加失败，未选择增加题目的类型');
            setVisible(false)
            return;
        }
        setConfirmLoading(true)
        changeSubject();
        setVisible(false)
        setConfirmLoading(false)
    };
    // 在点击发布时处理问卷的信息
    const handleInputData = (obj: any, index: number) => {
        let tempAddSubjectList = deepCopy(addSubjectList)
        tempAddSubjectList[index] = obj;
        setAddSubjectList(tempAddSubjectList)
        console.log(addSubjectList);
        // TODO: 传递数据给后端
    }

    const changeSubject = () => {
        let tempAddSubjectList = deepCopy(addSubjectList)
        let length = tempAddSubjectList.length;
        const contrast = {
            0: {
                index: length,
                title: '标题',
                options: [
                    'A',
                    'B',
                    'C',
                    'D'
                ],
                isRequired: false,
                type: 'radio',
            },
            1: {
                index: length,
                title: '标题',
                options: [
                    'A',
                    'B',
                    'C',
                    'D'
                ],
                isRequired: false,
                type: 'checkBox',
            },
            2: {
                index: length,
                title: '标题',
                isRequired: false,
                type: 'singleText',
            },
            3: {
                index: length,
                title: '标题',
                isRequired: false,
                type: 'multiline',
            }
        }
        tempAddSubjectList.push(contrast[(value as number)])

        setAddSubjectList(tempAddSubjectList)
        setValue(null)
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            <EditQuestionTitle handleChange={handleChange} />
            <SubjectShow
                addSubjectList={addSubjectList}
                handleInputData={handleInputData}
                isSubmit={isSubmit}
            />
            <div className={`${stylePrefix}-main`}>
                <div
                    style={{
                        border: (addIsMouse ? '2px dashed #00CCFF' : '2px dashed #ccc'),
                    }}
                    className={`${stylePrefix}-icon-layout`}
                    onMouseOver={() => { setAddIsMouse(true) }}
                    onMouseOut={() => { setAddIsMouse(false) }}
                    onClick={() => { setVisible(true) }}
                >
                    <IconFont
                        type='anticonjia'
                        style={{
                            color: (addIsMouse ? '#00CCFF' : '#ddd'),
                        }}
                        className={`${stylePrefix}-icon`}
                    />
                </div>
            </div>
            <Modal
                title="请选择增加的题目类型"
                visible={visible}
                onOk={handleOk}
                confirmLoading={confirmLoading}
                onCancel={() => { setVisible(false) }}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio className={`${stylePrefix}-radio-style`} value={0}>
                        单选框
                </Radio>
                    <Radio className={`${stylePrefix}-radio-style`} value={1}>
                        复选框
                </Radio>
                    <Radio className={`${stylePrefix}-radio-style`} value={2}>
                        单行文本框
                </Radio>
                    <Radio className={`${stylePrefix}-radio-style`} value={3}>
                        多行文本框
                </Radio>
                </Radio.Group>
            </Modal>
            <Button
                type="primary"
                disabled={addSubjectList.length > 0 ? false : true}
                onClick={() => setIsSubmit(true)}
                className={`${stylePrefix}-btn`}
            >发布</Button>
        </div>
    )
}
