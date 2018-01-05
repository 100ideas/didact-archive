import React from 'react';
import { Position, Toaster } from '@blueprintjs/core';

import App from '../components/App';

const Index = () => {
  const handleOnClick = () => {
    const ourToaster = Toaster.create({
      className: 'pt-intent-danger',
      position: Position.CENTER_TOP,
    });
    ourToaster.show({ message: 'Hello World' });
  };

  return (
    <App title="index">
      <div>Index Page</div>
      <button
        type="button"
        className="pt-button pt-intent-primary"
        onClick={handleOnClick}
      >
        Hello
      </button>
    </App>
  );
};

export default Index;
