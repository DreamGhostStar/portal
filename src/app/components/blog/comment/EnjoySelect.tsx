import React from 'react'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

interface EnjoySelectConfig {
    addEmoji: any
}

export default function EnjoySelect({ addEmoji }: EnjoySelectConfig) {
    return (
        <Picker set='google' onSelect={addEmoji} emojiSize={30} />
    )
}
