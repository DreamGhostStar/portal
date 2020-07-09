import { connect } from 'react-redux'
import { transform_user } from '../redux/actions'
import HomePage from '../app/pages/HomePage'
export default connect(
    (state: any) => ({
        user: state
    }),
    { transform_user }
)(HomePage)