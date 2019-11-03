import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Spinner from '../spinner.js';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('test component Spinner', () => {

  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Spinner/>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

});
