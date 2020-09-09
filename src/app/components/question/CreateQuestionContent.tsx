import React, { useState, useRef, useEffect } from 'react'
import { Button, Modal, Radio, Input, DatePicker } from 'antd';
import SubjectShow from './SubjectShow';
import EditQuestionTitle from './EditQuestionTitle';
import moment from 'moment';
import { IconFont, error } from '../common/config';
import 'app/styles/createQuestion/createQuestionContent.scss'
import { deepCopy, formatTime } from '../common/utils';
import { optionItemConfig } from 'app/pages/Question';
import questionContentModel from 'model/questionContent.json'

const { RangePicker } = DatePicker;
const stylePrefix = 'question-createQuestionContent';
const { TextArea } = Input;
const nowDate = new Date().getTime().toString()
const dateFormat = 'YYYY-MM-DD h:mm:ss';
export const optionDefault = [
    {
        id: 1,
        value: 'A'
    },
    {
        id: 2,
        value: 'B'
    },
    {
        id: 3,
        value: 'C'
    },
    {
        id: 4,
        value: 'D'
    }
]

export interface subjectItemConfig {
    id: number
    isRequired: boolean
    options?: optionItemConfig[]
    title: string
    type: string
}

interface CreateQuestionContentConfig {
    questionID: number | null
}

export default function CreateQuestionContent({ questionID }: CreateQuestionContentConfig) {
    const [addIsMouse, setAddIsMouse] = useState(false)
    const [addSubjectVisible, setAddSubjectVisible] = useState(false) // 增加题目的开关
    const [addConfigVisible, setAddConfigVisible] = useState(false) // 最后配置的开关
    const [confirmLoading, setConfirmLoading] = useState(false) // 增加题目的loading
    const [addConfigLoading, setAddConfigLoading] = useState(false) // 最后配置的loading
    const [value, setValue] = useState<number | null>(null) // 选择的是哪种题目的类型
    const [addSubjectList, setAddSubjectList] = useState<subjectItemConfig[]>([]) // 要传给后端的问卷题目
    const [inputValue, setInputValue] = useState('问卷题目') // 要传给后端的问卷标题
    const [isSubmit, setIsSubmit] = useState(false)// 在对话框中选择不同选项所增加的题目
    const [startTime, setStartTime] = useState<string | null>(null)
    const [endTime, setEndTime] = useState<string | null>(null)
    const [abstarct, setAbstract] = useState('')
    const [dropIndex, setDropIndex] = useState<number | null>(null) // 拖动元素暂存索引
    // 对话框中单选按钮的变化
    const onChange = (e: any) => {
        setValue(e.target.value)
    };
    // 禁止选中当前时间之前的日期
    const disabledDate = (current: moment.Moment) => {
        return current && current <= moment().endOf('day');
    }
    // 处理日期改变后的函数
    const handleChangeDate = (values: any) => {
        const contrast = {
            0: setStartTime,
            1: setEndTime
        }
        values.map((item: any, index: number) => {
            contrast[index](item._d.getTime())
        })
    }
    // 标题的变化
    const handleChange = (e: any) => {
        setInputValue(e.target.value)
    }
    // 选择增加题目
    const addSubjectOk = () => {
        if (value === null) {
            error('增加失败，未选择增加题目的类型');
            setAddSubjectVisible(false)
            return;
        }
        setConfirmLoading(true)
        changeSubject();
        setAddSubjectVisible(false)
        setConfirmLoading(false)
    };
    // 最后配置的提交处理信息
    const submit = () => {
        if (!(startTime && endTime && abstarct)) {
            error('信息不能为空')
            return
        }
        console.log({
            title: inputValue,
            content: addSubjectList,
            startTime,
            abortTime: endTime,
            abstarct
        });
        // TODO: 传递数据给后端
    }
    // 在点击发布时处理问卷的信息
    const handleInputData = (obj: subjectItemConfig, index: number) => {
        let tempAddSubjectList: subjectItemConfig[] = deepCopy(addSubjectList)
        tempAddSubjectList[index] = obj;
        setAddSubjectList(tempAddSubjectList)
        setAddConfigVisible(true)
    }
    const changeSubject = () => {
        let tempAddSubjectList: subjectItemConfig[] = deepCopy(addSubjectList)
        let length = tempAddSubjectList.length;
        const contrast = {
            0: {
                index: length,
                title: '标题',
                options: optionDefault,
                isRequired: false,
                type: 'radio',
            },
            1: {
                index: length,
                title: '标题',
                options: optionDefault,
                isRequired: false,
                type: 'checkBox',
            },
            2: {
                index: length,
                title: '标题',
                isRequired: false,
                type: 'text',
            }
        }
        tempAddSubjectList.push(contrast[(value as number)])

        setAddSubjectList(tempAddSubjectList)
        setValue(null)
    }
    // 删除问卷项
    const deleteSubjectItem = (index: number) => {
        const tempSubjectList: subjectItemConfig[] = deepCopy(addSubjectList)
        tempSubjectList.splice(index, 1);
        setAddSubjectList(tempSubjectList)
    }
    // 交换问卷项
    const swapSubjectItem = (newIndex: number, oldIndex: number) => {
        const tempSubjectList: subjectItemConfig[] = deepCopy(addSubjectList)
        tempSubjectList[newIndex] = tempSubjectList.splice(oldIndex, 1, tempSubjectList[newIndex])[0];
        setAddSubjectList(tempSubjectList)
    }
    useEffect(() => {
        if (questionID !== null) {
            setAddSubjectList(questionContentModel.content)
            setInputValue(questionContentModel.title)
            setAbstract(questionContentModel.decoration)
            setStartTime(questionContentModel.startTime)
            setEndTime(questionContentModel.abortTime)
        }
    }, [])
    return (
        <div className={`${stylePrefix}-layout`}>
            <EditQuestionTitle
                title={inputValue}
                handleChange={handleChange}
            />
            <SubjectShow
                addSubjectList={addSubjectList}
                handleInputData={handleInputData}
                isSubmit={isSubmit}
                setDropIndex={setDropIndex}
                dropIndex={dropIndex}
                swapSubjectItem={swapSubjectItem}
                deleteSubjectItem={deleteSubjectItem}
            />
            <div className={`${stylePrefix}-main`}>
                <div
                    style={{
                        border: (addIsMouse ? '2px dashed #00CCFF' : '2px dashed #ccc'),
                    }}
                    className={`${stylePrefix}-icon-layout`}
                    onMouseOver={() => { setAddIsMouse(true) }}
                    onMouseOut={() => { setAddIsMouse(false) }}
                    onClick={() => { setAddSubjectVisible(true) }}
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
                visible={addSubjectVisible}
                onOk={addSubjectOk}
                confirmLoading={confirmLoading}
                onCancel={() => setAddSubjectVisible(false)}
            >
                <Radio.Group onChange={onChange} value={value}>
                    <Radio className={`${stylePrefix}-radio-style`} value={0}>
                        单选框
                </Radio>
                    <Radio className={`${stylePrefix}-radio-style`} value={1}>
                        复选框
                </Radio>
                    <Radio className={`${stylePrefix}-radio-style`} value={2}>
                        文本框
                </Radio>
                </Radio.Group>
            </Modal>
            <Modal
                title="请填写概要和截止时间"
                visible={addConfigVisible}
                onOk={submit}
                confirmLoading={addConfigLoading}
                onCancel={() => { setAddConfigVisible(false); setIsSubmit(false) }}
            >
                <div className={`${stylePrefix}-config-input-layout`}>
                    <div className={`${stylePrefix}-config-title`}>概要</div>
                    <TextArea onChange={(e: any) => setAbstract(e.target.value)} rows={4} value={abstarct} />
                </div>
                <div className={`${stylePrefix}-config-input-layout`}>
                    <div className={`${stylePrefix}-config-title`}>开始与截止时间</div>
                    <br />
                    <RangePicker
                        disabledDate={disabledDate}
                        onChange={handleChangeDate}
                        value={[moment(formatTime(startTime || nowDate), dateFormat), moment(formatTime(endTime || nowDate), dateFormat)]}
                        showTime
                    />
                </div>
            </Modal>
            <Button
                type="primary"
                disabled={addSubjectList.length > 0 ? false : true}
                onClick={() => setIsSubmit(true)}
                className={`${stylePrefix}-btn`}
            >
                发布
            </Button>
        </div>
    )
}
