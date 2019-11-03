import React from 'react';
import ReactDOM from 'react-dom';
import BookingsPage from '../bookingsPage';

describe('test view BookingsPage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<BookingsPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

})
