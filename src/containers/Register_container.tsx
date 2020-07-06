import { connect } from 'react-redux'
import { transform_user } from '../redux/actions'
import Register from '../app/components/login/Register'
export default connect(
    ( state: any) => ({
        user: state
    }),
    { transform_user }
)(Register)