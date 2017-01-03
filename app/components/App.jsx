import React from 'react';

import Tab from './Tab.jsx';

class AppComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-fixed-top navbar-dark bg-inverse">
          <a className="navbar-brand" href="#">React Router</a>
          <ul className="nav navbar-nav">
            <Tab className="nav-item" to="/" onlyActiveOnIndex={true}>Home</Tab>
            <Tab className="nav-item" to="/about" onlyActiveOnIndex={false}>About</Tab>
            <Tab className="nav-item" to="/contact/sales" onlyActiveOnIndex={false}>Contact</Tab>
          </ul>
        </nav>

        <div className="container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default AppComponent;
