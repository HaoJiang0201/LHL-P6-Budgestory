import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Tracking from './pages/Tracking';
import Management from './pages/Management';

class App extends Component {

  render() {
    const App = () => (
      <div>
        <Switch>
          <Route exact path='/' component={Tracking}/>
          <Route path='/track' component={Tracking}/>
          <Route path='/manage' component={Management}/>
        </Switch>
      </div>
    )
    return (
      <div>
        <App/>
      </div>
    );
  }
}

export default App;