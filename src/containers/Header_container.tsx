import { connect } from 'react-redux'
import Header from './../app/components/homeSeconds/Header'
export default connect(
    (state: any) => ({
        user: state.user
    }),
    {}
)(Header)