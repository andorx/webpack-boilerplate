import React from 'react';

class HelloComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  greet() {
    return this.props.name;
  }

  handleClick() {
    alert('Clicked');
  }

  render() {
    return (
      <div>
        <h1>Hello, { this.greet() }!</h1>
        <button onClick={this.handleClick}>Click Me</button>
      </div>
    );
  }
}

export default HelloComponent;
