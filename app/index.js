import ReactDOM from 'react-dom';
import React from 'react';
import {
  Router,
  Route,
  IndexRoute,
  browserHistory,
  hashHistory
} from 'react-router';

import AppComponent from './components/App.jsx';
import HomeComponent from './components/Home.jsx';
import ContactComponent from './components/Contact.jsx';
import AboutComponent from './components/About.jsx';

ReactDOM.render((
  <Router history={browserHistory}>
    <Route path="/" component={AppComponent}>
      <IndexRoute component={HomeComponent} />

      <Route path="/contact/:target" component={ContactComponent} />
      <Route path="/about" component={AboutComponent} />
    </Route>
  </Router>
  ),
  document.getElementById('app')
);
