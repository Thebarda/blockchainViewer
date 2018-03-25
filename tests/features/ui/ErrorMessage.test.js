import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import { ErrorMessage } from 'src/features/ui';

describe('ui/ErrorMessage', () => {
  it('renders node with correct class name', () => {
    const renderedComponent = shallow(
      <ErrorMessage />
    );

    expect(
      renderedComponent.find('.ui-error-message').getElement()
    ).to.exist;
  });
});
