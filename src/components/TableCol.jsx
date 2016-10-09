import React from 'react';

import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table';

const HeaderCol = ({ text }) => (<TableHeaderColumn>{text}</TableHeaderColumn>);
HeaderCol.propTypes = { text: React.PropTypes.string };

const RowCol = ({ text }) => (<TableRowColumn>{text}</TableRowColumn>);
RowCol.propTypes = {
  text: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

export { HeaderCol, RowCol };
