/* eslint-disable react/jsx-props-no-spreading */
import type {
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import {
  Pages,
} from '../Pages';
import type {
  InnerPagesComponentProps,
} from '../Pages';

import type {
  PagesProps,
} from '../../types';

type PageObject = {
  getPagesComponentProp: <Key extends keyof InnerPagesComponentProps>(
    propName: Key,
  ) => InnerPagesComponentProps[Key];
};

const setup = (props: Omit<PagesProps, 'rootProps'>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <Pages
      rootProps={rootProps}
      {...props}
    />,
  );

  const result = renderer
    .getRenderOutput() as ReactElement<InnerPagesComponentProps, FC>;

  return {
    getPagesComponentProp: (propName) => result.props[propName],
  };
};

test('should provide correct props to PagesComponent', () => {
  const page = setup({
    children: 'test',
  });

  expect(page.getPagesComponentProp('children')).toBe('test');
  expect(page.getPagesComponentProp('rootProps')).toBe(rootProps);
});
