import React, { useState, useRef } from 'react'
import '../../styles/login/InputField.scss'
import Bubble from '../common/Bubble';
import { IconFont } from '../common/config';
import { registerInputDataConfig, formConfig } from './Register';

export default function InputField({ data, transfornFun }: {data: any, transfornFun: any}) {
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
                className='icon'
                onClick={() => { setIsShowPassword(!isShowPassword) }}
                type={isShowPassword ? 'anticonxianshi' : 'anticontubiao-'}
            />
        } else {
            return null;
        }
    }
    return (
        <div style={{
            position: 'relative'
        }}>
            <div style={{
                position: 'absolute',
                left: -313,
                top: 0,
                display: (tip ? 'block' : 'none')
            }}>
                <Bubble tip={tip} />
            </div>
            <div style={{
                display: 'flex',
                width: 350,
                marginLeft: 25,
                justifyContent: 'space-between',
                border: '2px solid white',
                marginTop: 10,
                marginBottom: 20,
                borderRadius: 5,
                boxShadow: (verifyResult ? 'none' : '0px 0px 3px #f00')
            }}>
                <div style={{
                    paddingRight: 10,
                    height: 40,
                    borderRight: '2px solid white',
                    backgroundColor: '#bbb',
                    borderLeftColor: (verifyResult ? '#fff' : '#f00')
                }}>
                    <IconFont type={data.icon} style={{
                        fontSize: 20,
                        color: '#fff',
                        marginTop: 9,
                        marginLeft: 8
                    }} />
                </div>
                <input
                    type={isShowPassword ? 'password' : 'text'}
                    className='inputField'
                    style={{
                        border: 'none'
                    }}
                    placeholder={data.placeholder}
                    ref={inputRef}
                    onBlur={() => handleData(data)}
                />
                {handleShowPasswordIcon(data)}
            </div>
        </div>
    )
}
