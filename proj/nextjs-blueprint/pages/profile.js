import React, { Component } from 'react';
import { Position, Toaster, Intent } from '@blueprintjs/core';

import App from '../components/App';

class Profile extends Component {

  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const ourToaster = Toaster.create({
      position: Position.RIGHT_TOP,
    });
    this.toaster = ourToaster;
  }

  handleClick() {
    this.toaster.show({
      message: 'Foo Bar Baz',
      intent: Intent.DANGER,
    });
  }

  render() {
    return (
      <App title="profile">
        <div>Profile Page</div>
        <button
          type="button"
          className="pt-button pt-intent-primary"
          onClick={this.handleClick}
        >
          toast
        </button>
      </App>
    );
  }
}

export default Profile;
