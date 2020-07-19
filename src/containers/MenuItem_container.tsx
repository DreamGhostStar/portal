import { connect } from 'react-redux'
import { transfrom_type } from '../redux/actions'
import MenuItem from '../app/components/blog/MenuItem'
export default connect(
    (state: any) => ({
        login: state
    }),
    { transfrom_type }
)(MenuItem)