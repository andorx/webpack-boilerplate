import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';

class Tab extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const isActive = this.context.router.isActive(this.props.to, this.props.onlyActiveOnIndex);
    const LinkComponent = this.props.onlyActiveOnIndex ? IndexLink : Link;
    const className = isActive ? this.props.className + ' active' : this.props.className;

    return (
      <li className={className}>
        <LinkComponent
          className="nav-link"
          to={this.props.to}>
          {this.props.children}
        </LinkComponent>
      </li>
    );
  }
}

Tab.propTypes = {
  to: PropTypes.string,
  onlyActiveOnIndex: PropTypes.bool,
  children: PropTypes.node
};

Tab.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Tab;
