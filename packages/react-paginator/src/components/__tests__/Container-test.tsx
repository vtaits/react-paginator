/* eslint-disable react/jsx-props-no-spreading */
import type {
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import { Container } from '../Container';
import type {
  InnerContainerProps,
} from '../Container';

import type {
  ContainerComponentProps,
} from '../../types';

type PageObject = {
  getContainerComponentProp: <Key extends keyof InnerContainerProps>(
    propName: Key,
  ) => InnerContainerProps[Key];
};

const setup = (props: Partial<ContainerComponentProps>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <Container
      rootProps={rootProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<InnerContainerProps, FC>;

  return {
    getContainerComponentProp: (propName) => result.props[propName],
  };
};

test('should provide correct props to ContainerComponent', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getContainerComponentProp('children')).toBe('test');
  expect(page.getContainerComponentProp('rootProps')).toBe(rootProps);
});
