// 此组件为我的信息页面的信息显示小部件

import React, { useState, useRef } from 'react'
import '../../styles/my/myInfoSubItem.scss'
import { InputNumber, Button, Input } from 'antd';
import Driver from '../common/Driver'

import '../common/config'
import { error, IconFont } from '../common/config';
const { TextArea } = Input;
const stylePrefix = 'my-myInfoSubItem'
interface MyInfoSubItemConfig {
    transformValue: string | number,
    label: string,
    type: string,
    saveOtherInfo: any
}

export default function MyInfoSubItem({ transformValue, label, type, saveOtherInfo }: MyInfoSubItemConfig) {
    const [isAlter, setIsAlter] = useState(false)
    const [value, setValue] = useState(transformValue)
    const inputNumberRef = useRef(null)
    const inputRef = useRef(null)

    const handleCancel = () => {
        setIsAlter(false)
        setValue(transformValue)
    }
    const judgeInputType = () => {
        const contrast = {
            year: <InputNumber ref={inputNumberRef} min={2000} max={2020} defaultValue={(value as number)} className='input' />,
            motto: <TextArea ref={inputRef} rows={4} defaultValue={value} className='input' />,
            email: <Input ref={inputRef} defaultValue={value} className='input' />
        }
        return contrast[type]
    }
    // 将数据传给父组件
    const saveData = () => {
        if (type === 'year') {
            if (!(inputNumberRef.current as any).state.value) {
                error('输入不能为空')
                return;
            }
        }

        const contrast = {
            year: (inputNumberRef.current as any),
            motto: (inputRef.current as any),
            email: (inputRef.current as any)
        }
        setIsAlter(false)
        setValue(contrast[type].state.value)
        saveOtherInfo(type, contrast[type].state.value)
    }
    return (
        <>
            <Driver height={2} />
            <div className={`${stylePrefix}-layout`}>
                <div className={`${stylePrefix}-label`}>{label}</div>
                <div
                    className={`${stylePrefix}-value`}
                    style={{
                        display: (isAlter ? 'none' : 'block'),
                        color: (value ? '#000' : '#ccc')
                    }}
                >
                    {value || '空'}
                </div>
                <div className={`${stylePrefix}-alter`} style={{
                    display: (isAlter ? 'none' : 'flex')
                }}>
                    <IconFont type='anticonxiugai1' className={`${stylePrefix}-icon`} onClick={() => { setIsAlter(true) }} />
                    <div onClick={() => { setIsAlter(true) }}>修改</div>
                </div>
                <div style={{
                    display: (isAlter ? 'block' : 'none')
                }}>
                    {
                        judgeInputType()
                    }
                    <div className={`${stylePrefix}-operation`}>
                        <Button type="primary" onClick={saveData}>保存</Button>
                        <Button onClick={handleCancel}>取消</Button>
                    </div>
                </div>
            </div>
        </>
    )
}