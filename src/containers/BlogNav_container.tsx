import { connect } from 'react-redux'
import { transform_user } from '../redux/actions'
import BlogNav from 'app/components/blog/BlogNav'
export default connect(
    (state: any) => ({
        data: state
    }),
    { transform_user }
)(BlogNav)