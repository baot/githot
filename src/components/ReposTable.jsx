import React from 'react';
import { values, compose } from 'ramda';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { getItemProperties } from '../lib';

const HeaderCol = ({ text }) => (<TableHeaderColumn>{text}</TableHeaderColumn>);
HeaderCol.propTypes = { text: React.PropTypes.string };

const RowCol = ({ text }) => (<TableRowColumn>{text}</TableRowColumn>);
RowCol.propTypes = {
  text: React.PropTypes.oneOfType([
    React.PropTypes.string,
    React.PropTypes.number,
  ]),
};

const BodyRow = ({ repoVals }) => (
  <TableRow key={repoVals[name]}>
    {repoVals.map(v => <RowCol key={v} text={v} />)}
  </TableRow>
);
BodyRow.propTypes = {
  repoVals: React.PropTypes.arrayOf(
    React.PropTypes.oneOfType([
      React.PropTypes.string,
      React.PropTypes.number,
    ])
  ),
};

const ReposTable = ({ repos }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        {getItemProperties(repos).map(k => <HeaderCol key={k} text={k} />)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {repos.map(compose(repo => (<BodyRow key={repo[0]} repoVals={repo} />), values))}
    </TableBody>
  </Table>
);

ReposTable.propTypes = {
  repos: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ReposTable;
