import React, { useState, useEffect, useRef } from 'react'

interface TitleInputConfig {
    title: string,
    saveTitle: any
}

export default function TitleInput({ title, saveTitle }: TitleInputConfig) {
    const [isFocus, setIsFocus] = useState(false)
    const inputRef = useRef(null)
    useEffect(() => {
        if (title) {
            handleFocus()
        }
    }, [title])
    const handleClick = () => {
        if (isFocus) {
            setIsFocus(false);
            (inputRef.current as any).blur();
        } else {
            setIsFocus(true);
            (inputRef.current as any).focus();
        }
    }
    const handleFocus = () => {
        if (!isFocus) {
            setIsFocus(true)
        }
    }
    const handleBlur = () => {
        if ((inputRef.current as any).value) {
            saveTitle((inputRef.current as any).value)
        } else {
            setIsFocus(false)
        }
    }
    // 处理覆盖文字
    const handleMouseDown = (event: any) => {
        event.preventDefault()
    }
    return (
        <div style={{
            width: 1000,
            marginBottom: 50,
            position: 'relative',
        }}>
            <div
                style={{
                    width: 100,
                    fontSize: 30,
                    textIndent: 40,
                    position: 'absolute',
                    top: (isFocus ? -45 : 20),
                    transitionDuration: '.3s',
                    zIndex: 3,
                    cursor: 'auto'
                }}
                onMouseDown={(event) => handleMouseDown(event)}
                onClick={handleClick}
            >
                标题
            </div>
            <div style={{
                width: 1000,
                backgroundColor: '#000',
                height: 2,
                marginBottom: 10,
                position: 'relative',
                zIndex: 5
            }}></div>
            <input
                type="text"
                style={{
                    width: 1000,
                    outline: 0,
                    border: 0,
                    textIndent: 40,
                    height: 60,
                    fontSize: 30,
                    backgroundColor: '#eee'
                }}
                defaultValue={title}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <div style={{
                width: 1000,
                backgroundColor: '#000',
                height: 2,
                marginTop: 10,
                marginBottom: 40
            }}></div>
        </div>
    )
}