import React from 'react';
import { shallow } from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import Break, {
  BreakComponent,
} from '../Break';

const setup = (props) => {
  const wrapper = shallow(
    <Break
      rootProps={rootProps}
      {...props}
    />,
  );

  const getBreakComponent = () => wrapper.find(BreakComponent);

  const getBreakComponentProp = (propName) => getBreakComponent().prop(propName);

  return {
    getBreakComponentProp,
  };
};

test('should provide correct props to BreakComponent', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getBreakComponentProp('children')).toBe('test');
  expect(page.getBreakComponentProp('rootProps')).toBe(rootProps);
});
