import React from 'react';
import ReactDOM from 'react-dom';
import AuthPage from '../authPage';

describe('test view authPage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AuthPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

})
