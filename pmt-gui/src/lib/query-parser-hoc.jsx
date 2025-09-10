import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import {connect} from 'react-redux';

// Tutorials removed: no tutorial-from-url, no cards/tips handling

/* Higher Order Component to get parameters from the URL query string and initialize redux state
 * @param {React.Component} WrappedComponent: component to render
 * @returns {React.Component} component with query parsing behavior
 */
const QueryParserHOC = function (WrappedComponent) {
    class QueryParserComponent extends React.Component {
        render () {
            const componentProps = this.props;
            return (
                <WrappedComponent
                    {...componentProps}
                />
            );
        }
    }
    QueryParserComponent.propTypes = {
        // no tutorial-related props
    };
    return connect(
        null,
        null
    )(QueryParserComponent);
};

export {
    QueryParserHOC as default
};
