/* eslint-disable react/jsx-props-no-spreading */
import type {
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import { Container } from '../Container';

import type {
  ContainerComponentProps,
  StylingContainerProps,
} from '../../types';

type PageObject = {
  getContainerComponentProp: <Key extends keyof StylingContainerProps<unknown>>(
    propName: Key,
  ) => StylingContainerProps<unknown>[Key];
};

const setup = (props: Partial<ContainerComponentProps<unknown>>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <Container
      rootProps={rootProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<StylingContainerProps<unknown>, FC>;

  return {
    getContainerComponentProp: (propName) => result.props[propName],
  };
};

test('should provide correct props to ContainerComponent', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getContainerComponentProp('children')).toBe('test');
  expect(page.getContainerComponentProp('$rootProps')).toBe(rootProps);
});
