import { connect } from 'react-redux';
import Iss from './Iss';
import { getCoordsRequest } from './IssActions';

const mapStateToProps = state => ({
    issPosition: state.iss
});

function mapDispatchToProps(dispatch) {
    return {
        getCoordsRequest: () => dispatch(getCoordsRequest())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Iss);