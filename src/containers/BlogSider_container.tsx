import { connect } from 'react-redux'
// import { transform_blogSider } from '../redux/actions'
import BlogSider from '../app/components/blog/BlogSider'
export default connect(
    (state: any) => ({
        typeIndex: state
    }),
    { }
)(BlogSider)