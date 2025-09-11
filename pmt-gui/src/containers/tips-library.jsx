// no React import needed; no JSX used here
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {closeTipsLibrary} from '../reducers/modals';

const TipsLibrary = ({visible}) => {
    if (!visible) return null;
    return null; // tutorials removed
};

TipsLibrary.propTypes = {
    visible: PropTypes.bool
};

const mapStateToProps = state => ({
    visible: state.scratchGui.modals.tipsLibrary
});

const mapDispatchToProps = dispatch => ({
    onRequestClose: () => dispatch(closeTipsLibrary())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TipsLibrary);
