import React from 'react';
import ReactDOM from 'react-dom';
import Modal from '../modal.js';

import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

describe('test component Modal', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Modal/>, div);
    ReactDOM.unmountComponentAtNode(div);
  })

  it('renders Modal correctlly', () => {
    const { getByTestId } = render(<Modal title="test modal title" />);
    expect(getByTestId('modal')).toHaveTextContent('test modal title');

  })

  it('renders Modal correctlly with props.children', () => {
    const { getByTestId } = render(
      <Modal title="test modal title 02" >
        <div>
          <p>children component</p>
        </div>
      </Modal>
    );
    expect(getByTestId('modal')).toHaveTextContent('test modal title 02');
    expect(getByTestId('modal')).toHaveTextContent('children component');
  })

  it('renders Modal correctlly with Cancel Button', () => {
    const { getByTestId } = render(<Modal title="test modal title 03" canCancel={true} onCancel={() => {}}/>);
    expect(getByTestId('modal')).toHaveTextContent('test modal title 03');
    expect(getByTestId('modal')).toHaveTextContent('Cancel');
  })

  it('renders Modal correctlly with Confirm Button', () => {
    const { getByTestId } = render(<Modal title="test modal title 04" canConfirm={true} confirmText="confirmText" onConfirm={() => {}}/>);
    expect(getByTestId('modal')).toHaveTextContent('test modal title 04');
    expect(getByTestId('modal')).toHaveTextContent('confirmText');
  })


})
