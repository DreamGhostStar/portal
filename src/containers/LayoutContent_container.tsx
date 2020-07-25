import { connect } from 'react-redux'
import LayoutContent from '../app/components/blog/LayoutContent'
export default connect(
    state => ({
        data: state,
    }),
    {}
)(LayoutContent)