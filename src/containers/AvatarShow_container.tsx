import { connect } from 'react-redux'
import { remove_user, transform_user } from '../redux/actions'
import AvatarShow from '../app/components/common/AvatorShow'
export default connect(
    ( state: any) => ({
        user: state.user
    }),
    { remove_user, transform_user }
)(AvatarShow)