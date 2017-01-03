import React from 'react';
import { Link } from 'react-router';

class HomeComponent extends React.Component {
  constructor(props) {
    super(props);
    this.goToContact = this.goToContact.bind(this);
  }

  goToContact() {
    this.context.router.push('/contact/customer-service');
  }

  render() {
    return (
      <div className="starter-template" >
        <h1>Bootstrap starter template</h1>
        <p className="lead">Use this document as a way to quickly start any new project.<br /> All you get is this text and a mostly barebones HTML document.</p>
        <span className="btn btn-link">
          <Link to="/about">Go to About</Link>
        </span>
        <span className="btn btn-link ">
          <a onClick={this.goToContact}>Go to Contact (programmatically)</a>
        </span>
      </div>
    );
  }
}

HomeComponent.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default HomeComponent;
