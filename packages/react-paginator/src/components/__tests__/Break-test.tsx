/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import Break, {
  BreakComponent,
} from '../Break';
import type {
  BreakComponentProps,
} from '../../types';

type PageObject = {
  getBreakComponentProp: (propName: string) => any;
};

const setup = (props: Omit<BreakComponentProps, 'rootProps'>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <Break
      rootProps={rootProps}
      {...props}
    />,
  );

  const getBreakComponent = (): ShallowWrapper => wrapper.find(BreakComponent);

  const getBreakComponentProp = (propName: string): any => getBreakComponent().prop(propName);

  return {
    getBreakComponentProp,
  };
};

test('should provide correct props to BreakComponent', () => {
  const page = setup({
    children: 'test',
    previous: 0,
    next: 10,
    onPageChange: () => {},
    Link: () => null,
  });

  expect(page.getBreakComponentProp('children')).toBe('test');
  expect(page.getBreakComponentProp('rootProps')).toBe(rootProps);
});
