import { connect } from 'react-redux'
import { transfrom_currentPage } from '../redux/actions'
import Pagination from '../app/components/blog/Pagination'
export default connect(
    state => ({
        data: state
    }),
    { transfrom_currentPage }
)(Pagination)