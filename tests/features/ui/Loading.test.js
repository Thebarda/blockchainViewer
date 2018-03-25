import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { Loading } from 'src/features/ui';

describe('ui/Loading', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Loading />
    );

    expect(
      renderedComponent.find('.ui-loading').getElement()
    ).to.exist;
  });

  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <Loading size="small" />
    );

    expect(
      renderedComponent.find('.ui-loading').getElement()
    ).to.exist;
  });
});
