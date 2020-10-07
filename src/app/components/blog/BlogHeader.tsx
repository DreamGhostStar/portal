import React from 'react'
import BlogNavContainer from 'containers/BlogNav_container'
import 'app/styles/blog/blogHeader.scss'

import store from '../../../redux/store'
import { Provider } from 'react-redux'

interface BlogHeaderConfig {
    activeIndex: number | null
}
const stylePrefix = 'blog-header';

export default function BlogHeader({ activeIndex }: BlogHeaderConfig) {
    return (
        <div className={`${stylePrefix}-header-layout`}>
            <Provider store={store}>
                <BlogNavContainer activeIndex={activeIndex} />
            </Provider>
        </div>
    )
}