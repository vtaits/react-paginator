/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import Container, {
  ContainerComponent,
} from '../Container';

type PageObject = {
  getContainerComponentProp: (propName: string) => any;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <Container
      rootProps={rootProps}
      {...props}
    />,
  );

  const getContainerComponent = (): ShallowWrapper => wrapper.find(ContainerComponent);

  const getContainerComponentProp = (
    propName: string,
  ): any => getContainerComponent().prop(propName);

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
