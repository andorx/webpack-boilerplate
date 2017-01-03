import React from 'react';

class AboutComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h3>Contact to {this.props.params.target}</h3>
        <form>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              className="form-control"
              id="email"
              placeholder="Example input" />
          </div>
          <div className="form-group">
            <label htmlFor="feedback">Feedback</label>
            <textarea
              className="form-control"
              id="feedback"
              placeholder="Another input"></textarea>
          </div>

        </form>
      </div>
    );
  }
}

export default AboutComponent;
