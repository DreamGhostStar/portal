import React, { useState } from 'react'
import InputField from './InputField'
import { Checkbox, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import cookies from 'react-cookies'
import '../../styles/login/Register.scss'
import md5 from 'md5'
import { error, success } from '../common/config';

import { ILoginApi, login_api } from 'app/http/user';
import { isSuccess } from '../common/utils';
import { LocalStorage } from '../common/Storage';
const stylePrefix = 'login-register'

export interface formConfig {
    placeholder: string;
    icon: string;
    nullTip: string;
    errorTip: string;
    pattern: RegExp | null;
    isPassword: boolean;
    type: string;
    method: string;
}

export interface registerInputDataConfig {
    verifyResult?: boolean
    type?: string
    method?: string
    value?: string
}

const form: formConfig[] = [
    {
        placeholder: '请输入用户名',
        icon: "anticonyonghu",
        nullTip: '输入不能为空',
        errorTip: '请输入英文作为你的用户名',
        pattern: /[a-zA-Z]/,
        isPassword: false,
        type: 'username',
        method: 'register'
    },
    {
        placeholder: '请输入至少6位密码',
        icon: "anticonziyuanxhdpi",
        nullTip: '输入不能为空',
        errorTip: '密码不能少于6位且不能包括中文',
        pattern: /\w{6,}/,
        isPassword: true,
        type: 'password',
        method: 'register'
    }
];

interface RegisterConfig {
    enterEnroll: any,
    transform_user: any
}

export default function Register({ enterEnroll, transform_user }: RegisterConfig) {
    let history = useHistory();
    const [verifyObj, setVerifyObj] = useState([{}, {}])

    // 接收InputField的数据
    const handleTransformData = (data: any) => {
        let verifyObjTemp = JSON.parse(JSON.stringify(verifyObj));
        if (data.type === "username") {
            verifyObjTemp[0] = data;
            setVerifyObj(verifyObjTemp)
        } else {
            verifyObjTemp[1] = data;
            setVerifyObj(verifyObjTemp)
        }
    }

    // 处理登录按钮
    const hanleClick = () => {
        // 遍历查找verifyResult，如果全部为真，则传到后端进行用户验证
        let count = 0; // 错误计数器
        verifyObj.map((item, index) => {
            if (!(item as any).verifyResult) {
                count++;
            }
            return index;
        })
        if (count) {
            error('格式错误');
            return;
        }

        getLoginUser((verifyObj[0] as any).value, md5((verifyObj[1] as any).value))
    }

    // 登录接口
    const getLoginUser = async (username: string, password: string) => {
        let obj: ILoginApi = {};
        obj.key = username;
        obj.password = password;

        const res = await login_api(obj);

        if (res) {
            if (isSuccess(res.code)) {
                // 向redux传递用户信息
                transform_user(res.data)

                // TODO: 使用localStorage
                LocalStorage.set('Authorization', res.data.token, new Date(new Date().getTime() + 7 * 24 * 3600 * 1000))
                // 使用cookie存放token
                // cookies.save('Authorization', res.data.token, {})

                // 提示成功信息
                success('登录成功');

                // 跳转到首页
                history.push("/home");
            } else {
                error(res.message);
            }
        }
    }

    return (
        <div className={`${stylePrefix}-layout`}>
            <div className={`${stylePrefix}-main`}>
                <div className={`${stylePrefix}-words`}>
                    <div className={`${stylePrefix}-word-register`}>登录</div>
                    <div className={`${stylePrefix}-word-enroll`} onClick={enterEnroll}>注册</div>
                </div>
                <InputField data={form[0]} transfornFun={handleTransformData} />
                <InputField data={form[1]} transfornFun={handleTransformData} />
                <div className={`${stylePrefix}-other-layout`}>
                    <Checkbox style={{
                        marginTop: 0,
                        marginBottom: 20,
                    }}>
                        <span className={`${stylePrefix}-other-word`}>
                            记住密码
                        </span>
                    </Checkbox>
                    <div className={`${stylePrefix}-other-word`}>
                        忘记密码？
                    </div>
                </div>
                <Button type="primary" className={`${stylePrefix}-register-btn`} onClick={() => hanleClick()}>登录</Button>
            </div>
        </div>
    )
}
