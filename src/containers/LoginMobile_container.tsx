import { connect } from 'react-redux'
import { transform_user } from '../redux/actions'
import LoginMobile from '../app/components/login/LoginMobile'
export default connect(
    state => ({
        data: state,
    }),
    { transform_user }
)(LoginMobile)