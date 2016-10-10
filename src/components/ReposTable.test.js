import React from 'react';
import expect from 'expect';
import { Table, TableHeader, TableBody } from 'material-ui/Table';
import { shallow, mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import ReposTable from './ReposTable';
import ReposTableRow from './ReposTableRow';

describe('Repos Table test', () => {
  const repos = [
    {
      name: 'linux',
      owner: 'torvalds',
      description: 'linux tree',
      created_at: '2011-09-04',
      stars: 37459,
    },
    {
      name: 'redis',
      owner: 'antirez',
      description: 'in-memory database',
      created_at: '2009-03-21',
      stars: 20047,
    },
  ];

  it('should has correct child components', () => {
    const wrapper = shallow(<ReposTable repos={repos} />);
    expect(wrapper.find(Table).length).toBe(1);
    expect(wrapper.find(TableHeader).length).toBe(1);
    expect(wrapper.find(TableBody).length).toBe(1);
  });

  it('should has 2 table rows with correct props', () => {
    const wrapper = mount(<ReposTable repos={repos} />, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

    expect(wrapper.find(ReposTableRow).length).toBe(2);
    const reposValRow1 = ['linux', 'torvalds', 'linux tree', '2011-09-04', 37459];
    expect(wrapper.find(ReposTableRow).at(0).prop('repoVals')).toEqual(reposValRow1);
    const reposValRow2 = ['redis', 'antirez', 'in-memory database', '2009-03-21', 20047];
    expect(wrapper.find(ReposTableRow).at(1).prop('repoVals')).toEqual(reposValRow2);
  });
});
