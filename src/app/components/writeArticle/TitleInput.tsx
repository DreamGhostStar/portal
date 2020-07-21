import React, { useState, useEffect, useRef } from 'react'
import 'app/styles/edit/titleInput.scss'

const stylePrefix = 'edit-titleInput'

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
        <div className={`${stylePrefix}-layout`}>
            <div
                style={{
                    top: (isFocus ? -45 : 20),
                }}
                className={`${stylePrefix}-title`}
                onMouseDown={(event) => handleMouseDown(event)}
                onClick={handleClick}
            >
                标题
            </div>
            <div className={`${stylePrefix}-back-1`}></div>
            <input
                type="text"
                className={`${stylePrefix}-input`}
                defaultValue={title}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <div className={`${stylePrefix}-back-2`}></div>
        </div>
    )
}