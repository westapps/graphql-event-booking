import React from 'react';
import ReactDOM from 'react-dom';
import EventsPage from '../eventsPage';

describe('test view EventsPage', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventsPage />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

})
