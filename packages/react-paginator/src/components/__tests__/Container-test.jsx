import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import Container, {
  ContainerComponent,
} from '../Container';

const setup = (props) => {
  const wrapper = shallow(
    <Container
      rootProps={rootProps}
      {...props}
    />,
  );

  const getContainerComponent = () => wrapper.find(ContainerComponent);

  const getContainerComponentProp = (propName) => getContainerComponent().prop(propName);

  return {
    getContainerComponentProp,
  };
};

test('should provide correct props to ContainerComponent', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getContainerComponentProp('children')).toBe('test');
  expect(page.getContainerComponentProp('rootProps')).toBe(rootProps);
});
