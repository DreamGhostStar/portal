/* 
    移动端登录注册模块
*/
import React, { useState } from 'react'
import 'app/styles/login/loginMobile.scss'
import { Input, Checkbox, Button } from 'antd'
import registerStatic from 'static/register.json'
import enrollStatic from 'static/enroll.json'
import { deepCopy } from '../common/utils'
import cookies from 'react-cookies'
import { useHistory } from 'react-router-dom'
import userInfo from 'model/userInfo.json' // TODO: 需删除

const stylePrefix = 'login-login-mobile'

interface LoginMobileConfig {
    isLogin: boolean // true为登录，false为注册
    setReversalIndex: React.Dispatch<React.SetStateAction<number>>
    transform_user: any
}

export default function LoginMobile({ isLogin, setReversalIndex, transform_user }: LoginMobileConfig) {
    const history = useHistory()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [verifyPassword, setVerifyPassword] = useState('')
    const [verifyCode, setVerifyCode] = useState('')
    const [editStatusList, setEditStatusList] = useState<number[]>([]) // 输入框编辑状态列表

    const inputValueContrasts = {
        0: username,
        1: password,
        2: verifyPassword,
    }
    // TODO: 需要增加记住密码功能
    const onChangeRemember = (e: any) => {
        console.log(`checked = ${e.target.checked}`);
    }

    // 显示错误提示
    const buildInputErrorText = (value: string, normalErrorText: string, index: number) => {
        let errorText = '输入不能为空';
        const patternContrasts = {
            0: /^[a-zA-Z]*$/,
            1: /^\w{6,}$/,
            2: null,
            3: /^[a-zA-Z]{4}$/, // 4位字母
        }
        if (value) {
            errorText = patternContrasts[index] && !patternContrasts[index].test(value) ? normalErrorText : '';
        }
        if (index === 2) {
            errorText = verifyPassword === password ? '' : normalErrorText;
        }
        if (editStatusList.indexOf(index) !== -1) {
            return <p style={{
                color: 'red'
            }}>{errorText}</p>
        } else {
            return <div></div>
        }
    }

    // 更新输入框的值
    const updateInputValue = (index: number, value: string) => {
        const updateFunContrasts = {
            0: setUsername,
            1: setPassword,
            2: setVerifyPassword,
            3: setVerifyCode,
        }
        updateFunContrasts[index](value)

        if (editStatusList.indexOf(index) === -1) {
            const tempEditStatusList = deepCopy(editStatusList);
            tempEditStatusList.push(index)
            setEditStatusList(tempEditStatusList)
        }
    }

    // 提交
    const submit = () => {
        let inFifteenMinutes = new Date(new Date().getTime() + 7 * 24 * 3600 * 1000) // 7天
        if (isLogin) {
            // TODO: 需修改
            cookies.save('Authorization', 'xxx', { expires: inFifteenMinutes });
            console.log(username, password);
            history.push('/home')
            transform_user(userInfo)
        } else {
            console.log(username, password, verifyCode);
        }
    }

    const switchMethod = () => {
        setReversalIndex(isLogin ? 1 : 0)
        setEditStatusList([]);
        setUsername('')
        setPassword('')
        setVerifyPassword('')
        setVerifyCode('')
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            {
                (isLogin ? registerStatic : enrollStatic).map((inputItem, index) => {
                    return <div key={index} className={`${stylePrefix}-input-layout`} >
                        <p>{inputItem.title}</p>
                        {
                            inputItem.isPassword
                                ? <Input.Password
                                    placeholder={inputItem.placeholder}
                                    onChange={(e) => updateInputValue(index, e.target.value)}
                                    value={inputValueContrasts[index]}
                                />
                                : <Input
                                    placeholder={inputItem.placeholder}
                                    onChange={(e) => updateInputValue(index, e.target.value)}
                                    value={inputValueContrasts[index]}
                                />
                        }
                        {buildInputErrorText(inputValueContrasts[index], inputItem.errorText, index)}
                    </div>
                })
            }
            {
                isLogin
                    ? <div className={`${stylePrefix}-operation-layout`}>
                        <Checkbox onChange={onChangeRemember}>记住密码</Checkbox>
                        <p className={`${stylePrefix}-link-word`}>忘记密码</p>
                    </div>
                    : <>
                        <p>验证码</p>
                        <div className={`${stylePrefix}-operation-layout`}>
                            <Input
                                placeholder='验证码'
                                className={`${stylePrefix}-verify-input`}
                                onChange={(e) => updateInputValue(3, e.target.value)}
                            />
                            <img src="" alt="验证码" className={`${stylePrefix}-verify-img`} />
                        </div>
                    </>
            }
            <Button
                type="primary"
                className={`${stylePrefix}-button`}
                onClick={submit}
            >
                {isLogin ? '登录' : '注册'}
            </Button>
            <p
                className={`${stylePrefix}-link-word ${stylePrefix}-switch`}
                onClick={switchMethod}
            >
                {`去${isLogin ? '注册' : '登录'}>`}
            </p>
        </div>
    )
}
