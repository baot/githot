import React from 'react';
import { values, map, compose } from 'ramda';
import { Table, TableHeader, TableHeaderColumn, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';

import { getItemProperties } from '../lib';

const HeaderCol = ({ text }) => (<TableHeaderColumn className="flexItem">{text}</TableHeaderColumn>);

const RowCol = ({ text }) => (<TableRowColumn className="flexItem">{text}</TableRowColumn>);

const BodyRow = ({ repo }) => (
  <TableRow className="flexContainer">{repo.map(v => <RowCol text={v} />)}</TableRow>
);

const ReposTable = ({ repos }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow className="flexContainer">
        {getItemProperties(repos).map(k => <HeaderCol text={k} />)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {repos.map(compose(arr => (<BodyRow repo={arr} />), values))}
    </TableBody>
  </Table>
);

ReposTable.propTypes = {
  repos: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ReposTable;
