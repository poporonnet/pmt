import React from 'react';
import {connect} from 'react-redux';

// Tutorials removed: no tutorial-from-url, no cards/tips handling

/* Higher Order Component to get parameters from the URL query string and initialize redux state
 * @param {React.Component} WrappedComponent: component to render
 * @returns {React.Component} component with query parsing behavior
 */
const QueryParserHOC = function (WrappedComponent) {
    const QueryParserComponent = props => (
        <WrappedComponent {...props} />
    );
    return connect(
        null,
        null
    )(QueryParserComponent);
};

export {
    QueryParserHOC as default
};
