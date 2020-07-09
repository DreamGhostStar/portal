import React, { useState } from 'react'
import InputField from './InputField'
import { Checkbox, Button } from 'antd';
import { useHistory } from 'react-router-dom'
import { _login } from '../common/Api';
import cookies from 'react-cookies'
import '../../styles/login/Register.scss'
import md5 from 'md5'
import { error, success } from '../common/config';

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

export default function Register({ enterEnroll }: { enterEnroll: any }, props: any) {
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
        interface loginConfig {
            key?: string,
            password?: string,
        }
        let obj: loginConfig = {};
        obj.key = username;
        obj.password = password;

        console.log(obj)
        const res = await _login(obj);

        console.log(res)
        if (res) {
            if (res.data.code === 0) {
                // 向redux传递用户信息
                props.transform_user(res.data.data)

                // 使用cookie存放token
                cookies.save('Authorization', res.data.data.token, {})

                // 提示成功信息
                success('登录成功');

                // 跳转到首页
                history.push("/home");
            } else {
                error(res.data.message);
            }
        }
    }

    return (
        <div style={{
            width: 400,
            height: 600,
            position: 'relative',
        }}>
            <div style={{
                backgroundColor: 'rgba(33, 33, 33, 0.3)',
                height: 400,
                borderRadius: 5
            }}>
                <div style={{
                    width: 350,
                    margin: '0 auto',
                    paddingTop: 20,
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingBottom: 20
                }}>
                    <div style={{
                        color: '#fff',
                        width: 150,
                        textAlign: 'center',
                        fontSize: 30,
                        borderBottom: '3px solid white',
                        paddingBottom: 10,
                        cursor: 'pointer'
                    }}>登录</div>
                    <div style={{
                        color: '#ddd',
                        width: 150,
                        textAlign: 'center',
                        fontSize: 30,
                        paddingBottom: 10,
                        cursor: 'pointer'
                    }} onClick={enterEnroll}>注册</div>
                </div>
                <InputField data={form[0]} transfornFun={handleTransformData} />
                <InputField data={form[1]} transfornFun={handleTransformData} />
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginLeft: 25,
                    marginRight: 25
                }}>
                    <Checkbox style={{
                        marginTop: 0,
                        marginBottom: 20,
                    }}>
                        <span style={{
                            color: '#fff',
                            fontSize: 18
                        }}>
                            记住密码
                        </span>
                    </Checkbox>
                    <div style={{
                        color: '#fff',
                        fontSize: 18
                    }}>
                        忘记密码？
                    </div>
                </div>
                <Button type="primary" style={{
                    marginLeft: 25,
                    width: 350,
                    height: 40,
                    fontSize: 20
                }} onClick={() => hanleClick()}>登录</Button>
            </div>
        </div>
    )
}
