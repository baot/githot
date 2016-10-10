import React from 'react';
import expect from 'expect';
import nock from 'nock';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { mount } from 'enzyme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Github from './Github';
import { CfakeRepos } from '../../test/testData';

describe('Repos Table test error', () => {
  it('should has <TextField />', () => {
    injectTapEventPlugin();
    const wrapper = mount(<Github />, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });
    expect(wrapper.find(TextField).length).toBe(1);
    expect(wrapper.find(TextField).prop('floatingLabelText')).toBe('Language');
  });

  it('should has <RaisedButton />', () => {
    const wrapper = mount(<Github />, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });
    expect(wrapper.find(RaisedButton).length).toBe(1);
    expect(wrapper.find(RaisedButton).text()).toBe('Search');
  });

  it('Search error', (done) => {
    const wrapper = mount(<Github />, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });
    // simulate writing to Language text field
    const textField = wrapper.find('input');
    textField.node.value = 'asd';
    textField.simulate('change', textField);
    expect(wrapper.state('searchTerm')).toBe('asd');

    // interceptor to api url request
    nock('https://api.github.com')
      .get('/search/repositories?q=language:asd&sort=stars&order=desc')
      .reply(422, {
        message: 'Validation Failed',
        errors: [
          { message: 'None of the search qualifiers apply to this search type.' },
        ],
      });

    // simulate click to Search Button
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      // assertions
      expect(wrapper.state().error).toBe('not found');
      expect(wrapper.find('.error').text()).toBe('not found');
      expect(wrapper.state().repos.length).toBe(0);

      nock.cleanAll();
      done();
    }, 1500);
  });

  it('Search success', (done) => {
    const wrapper = mount(<Github />, {
      context: {
        muiTheme: getMuiTheme(),
      },
      childContextTypes: {
        muiTheme: React.PropTypes.object.isRequired,
      },
    });

    // simulate writing to text field
    const textField = wrapper.find('input');
    textField.node.value = 'c';
    textField.simulate('change', textField);
    expect(wrapper.state('searchTerm')).toBe('c');

    // interceptor to api url request
    nock('https://api.github.com')
      .get('/search/repositories?q=language:c&sort=stars&order=desc')
      .reply(200, CfakeRepos);

    // simulate click to Search Button
    wrapper.find('button').simulate('click');

    setTimeout(() => {
      // asertions
      expect(wrapper.state().error).toBe('');
      expect(wrapper.find('.error').length).toBe(0);
      expect(wrapper.state().repos.length).toBe(2);
      const repos0 = {
        name: 'linux',
        owner: 'torvalds',
        description: 'Linux kernel source tree',
        created_at: '2011-09-04',
        stargazers_count: 37510,
      };
      expect(wrapper.state().repos[0]).toEqual(repos0);
      const repos1 = {
        name: 'redis',
        owner: 'antirez',
        description: 'Redis is an in-memory database that persists on disk. The data model is key-value, but many different kind of values are supported: Strings, Lists, Sets, Sorted Sets, Hashes, HyperLogLogs, Bitmaps.',
        created_at: '2009-03-21',
        stargazers_count: 20048
      };
      expect(wrapper.state().repos[1]).toEqual(repos1);

      nock.cleanAll();
      done();
    }, 1500);
  });
});
