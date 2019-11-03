import React from 'react';
import ReactDOM from 'react-dom';
import EventItem from '../eventItem.js';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('test component EventItem', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<EventItem/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders EventItem correctlly', () => {
    const { getByTestId } = render(<EventItem title="test title" price="8.88" />);
    expect(getByTestId('eventItem')).toHaveTextContent('test title');
    expect(getByTestId('eventItem')).toHaveTextContent('8.88');
  })

  it('renders EventItem correctlly with props.userId === props.creatorId', () => {
    const { getByTestId } = render(<EventItem title="test title" userId="007" creatorId="007"/>);
    expect(getByTestId('eventItem')).toHaveTextContent('test title');
    expect(getByTestId('eventItem')).toHaveTextContent('You are the owner of this event');
  })

  it('renders EventItem correctlly with props.userId !== props.creatorId', () => {
    const { getByTestId } = render(<EventItem title="test title" userId="007" creatorId="008" onDetail={() => {}}/>);
    expect(getByTestId('eventItem')).toHaveTextContent('test title');
    expect(getByTestId('eventItem')).toHaveTextContent('View Details');
  })
})
