/* eslint-disable react/jsx-props-no-spreading */
import type {
  ComponentProps,
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import {
  PageLinkGroup,
  PageLinkGroupComponent,
} from '../PageLinkGroup';
import type {
  PageLinkGroupProps,
} from '../../types';

type PageObject = {
  getPageLinkGroupComponentProp: <Key extends keyof ComponentProps<typeof PageLinkGroupComponent>>(
    propName: Key,
  ) => ComponentProps<typeof PageLinkGroupComponent>[Key];
};

const setup = (props: Omit<PageLinkGroupProps, 'rootProps'>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <PageLinkGroup
      rootProps={rootProps}
      {...props}
    />,
  );

  const result = renderer
    .getRenderOutput() as ReactElement<ComponentProps<typeof PageLinkGroupComponent>, FC>;

  return {
    getPageLinkGroupComponentProp: (propName) => result.props[propName],
  };
};

test('should provide correct props to PageLinkGroupComponent', () => {
  const page = setup({
    children: 'test',
    start: 0,
    end: 1,
  });

  expect(page.getPageLinkGroupComponentProp('children')).toBe('test');
  expect(page.getPageLinkGroupComponentProp('rootProps')).toBe(rootProps);
});
