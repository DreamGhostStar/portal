import { connect } from 'react-redux'
import ArticleContent from '../app/components/blog/ArticleContent'
export default connect(
    state => ({
        isLogin: state
    }),
    {}
)(ArticleContent)