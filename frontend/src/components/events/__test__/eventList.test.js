import React from 'react';
import ReactDOM from 'react-dom';
import EventList from '../eventList.js';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


const events = [
  {
    _id: '00111',
    title: 'test title 01',
    price:'9.99',
    date: '444449399393',
    creator: {
      _id:'0008'
    },
  },
  {
    _id: '00112',
    title: 'test title 02',
    price:'8.99',
    date: '444449399383',
    creator: {
      _id:'0009'
    },
  },
  {
    _id: '00113',
    title: 'test title 03',
    price:'7.99',
    date: '444449379393',
    creator: {
      _id:'0011'
    },
  },
];

describe('test component EventList', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventList events={events} authUserId="0007" onViewDetail={() => {}}/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

})
