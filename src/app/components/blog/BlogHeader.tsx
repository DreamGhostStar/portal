import React from 'react'
import BlogNavContainer from 'containers/BlogNav_container'

import store from '../../../redux/store'
import { Provider } from 'react-redux'

interface BlogHeaderConfig {
    activeIndex: number
}

export default function BlogHeader({ activeIndex }: BlogHeaderConfig) {
    return (
        <div style={{
            backgroundColor: '#fff',
            boxShadow: '0px 4px 5px #ddd',
            width: '100%',
            position: 'relative',
            zIndex: 2
        }}>
            <Provider store={store}>
                <BlogNavContainer activeIndex={activeIndex}/>
            </Provider>
        </div>
    )
}