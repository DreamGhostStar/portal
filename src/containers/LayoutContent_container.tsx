import { connect } from 'react-redux'
// import { reset_page } from '../redux/actions'
import LayoutContent from '../app/components/blog/LayoutContent'
export default connect(
    state => ({
        data: state,
    }),
    { }
)(LayoutContent)