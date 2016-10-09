import React from 'react';
import expect from 'expect';
import { shallow } from 'enzyme';
import { TableHeaderColumn, TableRowColumn } from 'material-ui/Table';

import { HeaderCol, RowCol } from './TableCol';

describe('HeaderCol test', () => {
  const wrapper = shallow(<HeaderCol text="headerText" />);

  it('should render a TableHeaderColumn', () => {
    expect(wrapper.find(TableHeaderColumn).length).toBe(1);
  });

  it('should has props text', () => {
    expect(wrapper.contains("headerText")).toExist();
  });
});

describe('RowCol test', () => {
  const wrapper = shallow(<RowCol text="rowText" />);

  it('should render a TableRowColumn', () => {
    expect(wrapper.find(TableRowColumn).length).toBe(1);
  });

  it('should has props text', () => {
    expect(wrapper.contains("rowText")).toExist();
  });
});
