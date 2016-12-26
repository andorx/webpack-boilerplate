import React from 'react';

class HelloComponent extends React.Component {
  constructor() {
    super();

    this.name = 'andorx';
  }

  greet() {
    return this.name;
  }

  render() {
    return (
      <h1>Hello, { this.greet() }!</h1>
    );
  }
}

export default HelloComponent;
