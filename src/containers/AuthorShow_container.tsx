import { connect } from 'react-redux'
import { remove_user, transform_user } from '../redux/actions'
import AuthorShow from '../app/components/common/AuthorShow'
export default connect(
    ( state: any) => ({
        user: state.user
    }),
    { remove_user, transform_user }
)(AuthorShow)