import React from 'react';
import { values, compose } from 'ramda';
import { Table, TableHeader, TableBody, TableRow } from 'material-ui/Table';

import ReposTableRow from './ReposTableRow';
import { HeaderCol } from './TableCol';
import { getItemProperties } from '../lib';

const ReposTable = ({ repos }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        {getItemProperties(repos).map(k => <HeaderCol key={k} text={k} />)}
      </TableRow>
    </TableHeader>
    <TableBody>
      {repos.map(compose(repo => (<ReposTableRow key={repo[0]} repoVals={repo} />), values))}
    </TableBody>
  </Table>
);

ReposTable.propTypes = {
  repos: React.PropTypes.arrayOf(React.PropTypes.object),
};

export default ReposTable;
