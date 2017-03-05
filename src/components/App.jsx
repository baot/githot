import React from 'react';
import AppBar from 'material-ui/AppBar';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router';
import FlatButton from 'material-ui/FlatButton';

import '../styles/index.scss';

const App = (props) => {
  const styles = {
     appBar: {
        flexWrap: 'wrap'
      },
      tabs: {
        width: '100%'
      }
  }

  return (
  <div>
    <AppBar
      title="Githot"
      showMenuIconButton={false}
      styles={styles.appBar}
    >
    <FlatButton label="Repo" containerElement={<Link to="/repo" />}/>
    </AppBar>
    {props.children}
  </div>
);
}
export default App;
