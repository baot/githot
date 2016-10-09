import React from 'react';
import expect from 'expect';
import { shallow, mount } from 'enzyme';
import { TableRow } from 'material-ui/Table';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ReposTableRow from './ReposTableRow';
import { RowCol } from './TableCol';

describe('ReposTableRow test', () => {
  const repo = ['linux', 'torvalds', 'linux tree', '2011-09-04', '37459'];

  it('should has a <TableRow />', () => {
    const wrapper = shallow(<ReposTableRow repoVals={repo} />);
    expect(wrapper.find(TableRow).length).toBe(1);
  });

  it('should has 5 <RowCol> with correct values', () => {
    const wrapper = mount(<ReposTableRow repoVals={repo} />, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

    expect(wrapper.find(RowCol).length).toBe(5);
    expect(wrapper.find(RowCol).at(0).text()).toBe('linux');
    expect(wrapper.find(RowCol).at(1).text()).toBe('torvalds');
    expect(wrapper.find(RowCol).at(2).text()).toBe('linux tree');
    expect(wrapper.find(RowCol).at(3).text()).toBe('2011-09-04');
    expect(wrapper.find(RowCol).at(4).text()).toBe('37459');
  });
});
