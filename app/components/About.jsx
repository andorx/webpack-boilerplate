import React from 'react';

class AboutComponent extends React.Component {
  constructor() {
    super();
  }

  greet() {
    return this.name;
  }

  render() {
    return (
      <div className="card">
        <div className="card-block">
          <h4 className="card-title">Card title</h4>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
      </div>
    );
  }
}

export default AboutComponent;
