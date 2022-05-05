/* eslint-disable react/jsx-props-no-spreading */
import type {
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import { Break } from '../Break';
import type {
  InnerBreakProps,
} from '../Break';

import type {
  BreakComponentProps,
} from '../../types';

type PageObject = {
  getBreakComponentProp: <Key extends keyof InnerBreakProps>(
    propName: Key,
  ) => InnerBreakProps[Key];
};

const setup = (props: Omit<BreakComponentProps, 'rootProps'>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <Break
      rootProps={rootProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<InnerBreakProps, FC>;

  return {
    getBreakComponentProp: (propName) => result.props[propName],
  };
};

test('should provide correct props to BreakComponent', () => {
  const page = setup({
    children: 'test',
    previous: 0,
    next: 10,
    onPageChange: () => undefined,
    Link: () => null,
  });

  expect(page.getBreakComponentProp('children')).toBe('test');
  expect(page.getBreakComponentProp('rootProps')).toBe(rootProps);
});
