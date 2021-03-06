import { connect } from 'react-redux'
import { transform_user } from '../redux/actions'
import Header from './../app/components/homeSeconds/Header'
export default connect(
    (state: any) => ({
        user: state.user
    }),
    { transform_user }
)(Header)