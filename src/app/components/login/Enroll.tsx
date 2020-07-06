import React, { useState, useRef } from 'react'
import InputField from './InputField'
import { Input, Button } from 'antd';
import VerifyImageShow from './VerifyImageShow';
import { _enroll } from '../common/Api';
import md5 from 'md5'
import { formConfig, registerInputDataConfig } from './Register';
import { error, success } from '../common/config';

const form: formConfig[] = [
    {
        placeholder: '请输入用户名',
        icon: "anticonyonghu",
        nullTip: '输入不能为空',
        errorTip: '请输入英文作为你的用户名',
        pattern: /[a-zA-Z]/,
        isPassword: false,
        type: 'username',
        method: 'enroll'
    },
    {
        placeholder: '请输入至少6位密码',
        icon: "anticonziyuanxhdpi",
        nullTip: '输入不能为空',
        errorTip: '密码不能少于6位且不能包括中文',
        pattern: /\w{6,}/,
        isPassword: true,
        type: 'password',
        method: 'enroll'
    },
    {
        placeholder: '请再次输入密码',
        icon: "anticonziyuanxhdpi",
        nullTip: '输入不能为空',
        errorTip: '两次密码输入不一致',
        pattern: null,
        isPassword: true,
        type: 'verifyPassword',
        method: 'enroll'
    }
];

export default function Enroll({ enterRegister }: { enterRegister: any }) {
    const [verifyObj, setVerifyObj] = useState<registerInputDataConfig[]>([{}, {}])
    const verifyNumberRef = useRef(null)


    // 接收InputField的数据
    const handleTransformData = (data: registerInputDataConfig) => {
        const verifyObjTemp = JSON.parse(JSON.stringify(verifyObj))
        if (data.type === "username") {
            verifyObjTemp[0] = data;
        } else if (data.type === "password") {
            verifyObjTemp[1] = data;
        } else {
            verifyObjTemp[2] = data;
        }

        setVerifyObj(verifyObjTemp)
    }

    // 点击注册，进行前端验证，并且跳转页面到登录页面
    const hanleClick = () => {
        // 遍历查找verifyResult，如果全部为真，则传到后端进行用户验证
        let count = 0; // 错误计数器
        verifyObj.map((item, index) => {
            if (!item.verifyResult) {
                count++;
            }
            return index;
        })

        if (verifyObj[1].value !== verifyObj[2].value) {
            error('两次密码输入不一致，请重新输入')
            return;
        }

        if (count) {
            error('请输入正确格式的用户名和密码');
            return;
        }

        enrollUser((verifyObj[0].value as string), md5((verifyObj[1].value as string)), (verifyObj[3].value as string));
    }

    // 注册接口
    const enrollUser = async (username: string, password: string, captcha: string) => {
        interface enrollConfig {
            username?: string,
            password?: string,
            captcha?: string,
        }
        let obj: enrollConfig = {};
        obj.username = username;
        obj.password = password;
        obj.captcha = captcha;

        const res = await _enroll(obj);

        if (res) {
            if (res.data.code === 0) {
                success('注册成功');

                enterRegister()
            } else {
                error(res.data.message) // TODO：错误需刷新验证码
            }
        }
    }

    // 保存验证码的数据
    const saveVerifyData = () => {
        // 点击按钮，发起ajax请求
        const value = (verifyNumberRef.current as any).state.value;

        // 创建临时对象存储验证码信息
        let obj: registerInputDataConfig = {};
        obj.verifyResult = true
        obj.value = value;

        const verifyObjTemp = JSON.parse(JSON.stringify(verifyObj))
        verifyObjTemp[3] = obj;
        setVerifyObj(verifyObjTemp)
    }
    return (<div style={{
        width: 400,
        height: 600,
        position: 'relative',
    }}>
        <div style={{
            backgroundColor: 'rgba(33, 33, 33, 0.3)',
            height: 450,
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
                    color: '#ddd',
                    width: 150,
                    textAlign: 'center',
                    fontSize: 30,
                    cursor: 'pointer'
                }} onClick={enterRegister}>登录</div>
                <div style={{
                    color: '#fff',
                    width: 150,
                    textAlign: 'center',
                    fontSize: 30,
                    borderBottom: '3px solid white',
                    cursor: 'pointer',
                    paddingBottom: 10
                }}>注册</div>
            </div>
            <InputField data={form[0]} transfornFun={handleTransformData} />
            <InputField data={form[1]} transfornFun={handleTransformData} />
            <InputField data={form[2]} transfornFun={handleTransformData} />
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginRight: 25
            }}>
                <Input
                    placeholder="验证码"
                    style={{
                        width: 137,
                        height: 50,
                        marginTop: 0,
                        marginBottom: 20,
                        marginLeft: 25
                    }}
                    ref={verifyNumberRef}
                    onBlur={saveVerifyData}
                    onPressEnter={saveVerifyData}
                />
                <VerifyImageShow />
            </div>
            <Button type="primary" style={{
                marginLeft: 25,
                width: 350,
                height: 40,
                fontSize: 20
            }} onClick={hanleClick}>注册</Button>
        </div>
    </div>
    )
}
