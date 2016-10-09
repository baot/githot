import React from 'react';
import { TableRow } from 'material-ui/Table';

import { RowCol } from './TableCol';

const ReposTableRow = ({ repoVals }) => (
  <TableRow key={repoVals[name]}>
    {repoVals.map(v => <RowCol key={v} text={v} />)}
  </TableRow>
);
ReposTableRow.propTypes = {
  repoVals: React.PropTypes.arrayOf(
    React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ])
  ),
};

export default ReposTableRow;
