import { connect } from 'react-redux'
import { transfrom_currentPage } from '../redux/actions'
import PaginationItem from '../app/components/blog/PaginationItem'
export default connect(
    state => ({
        data: state
    }),
    { transfrom_currentPage }
)(PaginationItem)