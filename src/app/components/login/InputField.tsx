import React, { useState, useRef } from 'react'
import '../../styles/login/InputField.scss'
import Bubble from '../common/Bubble';
import { IconFont } from '../common/config';
import { registerInputDataConfig, formConfig } from './Register';
const stylePrefix = 'login-inputField';

export default function InputField({ data, transfornFun }: { data: any, transfornFun: any }) {
    const [verifyResult, setVerifyResult] = useState(true)
    const [tip, setTip] = useState("")
    const [isShowPassword, setIsShowPassword] = useState(data.isPassword)
    const inputRef = useRef(null)

    const handleData = (data: formConfig) => {
        const value = (inputRef.current as any).value;
        let temp: registerInputDataConfig = {};

        if (!value) {
            setTip(data.nullTip)
            setVerifyResult(false)
            return;
        }

        if (data.pattern) {
            if (!data.pattern.test(value)) {
                setTip(data.errorTip)
                setVerifyResult(false)
                return;
            }
        }

        setTip('')
        setVerifyResult(true)

        // 创建临时对象，传递数据
        temp.verifyResult = true;
        temp.type = data.type;
        temp.method = data.method;
        temp.value = value;

        transfornFun(temp);
    }

    const handleShowPasswordIcon = (data: formConfig) => {
        if (data.isPassword) {
            return <IconFont
                className={`${stylePrefix}-show-icon`}
                onClick={() => { setIsShowPassword(!isShowPassword) }}
                type={isShowPassword ? 'anticonxianshi' : 'anticontubiao-'}
            />
        } else {
            return null;
        }
    }
    return (
        <div className={`${stylePrefix}-layout`}>
            <div
                className={`${stylePrefix}-tip`}
                style={{
                    display: (tip ? 'block' : 'none')
                }}
            >
                <Bubble tip={tip} />
            </div>
            <div
                className={`${stylePrefix}-main`}
                style={{
                    boxShadow: (verifyResult ? 'none' : '0px 0px 3px #f00')
                }}
            >
                <div
                    style={{
                        borderLeftColor: (verifyResult ? '#fff' : '#f00')
                    }}
                    className={`${stylePrefix}-icon-layout`}
                >
                    <IconFont
                        type={data.icon}
                        className={`${stylePrefix}-icon`}
                    />
                </div>
                <input
                    type={isShowPassword ? 'password' : 'text'}
                    className={`${stylePrefix}-input`}
                    placeholder={data.placeholder}
                    ref={inputRef}
                    onBlur={() => handleData(data)}
                />
                {handleShowPasswordIcon(data)}
            </div>
        </div>
    )
}
