/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */
import type {
  ComponentProps,
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import {
  PageLink,
  PageLinkComponent,
} from '../PageLink';

import type {
  PageLinkProps,
} from '../../types';

function Link(): ReactElement {
  return <div />;
}

type PageObject = {
  getPageLinkComponentProp: <Key extends keyof ComponentProps<typeof PageLinkComponent>>(
    propName: Key,
  ) => ComponentProps<typeof PageLinkComponent>[Key];
};

const setup = (props: Omit<PageLinkProps<unknown>, 'rootProps' | 'Link'>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <PageLink
      rootProps={rootProps}
      Link={Link}
      {...props}
    />,
  );

  const result = renderer
    .getRenderOutput() as ReactElement<ComponentProps<typeof PageLinkComponent>, FC>;

  return {
    getPageLinkComponentProp: (propName) => result.props[propName],
  };
};

test('should provide correct props to PageLinkComponent', () => {
  const page = setup({
    children: 'test',
    isCurrent: true,

    innerProps: {
      href: '/test/',
    },

    page: 1,
  });

  expect(page.getPageLinkComponentProp('children')).toBe('test');
  expect(page.getPageLinkComponentProp('rootProps')).toBe(rootProps);
  expect(page.getPageLinkComponentProp('href')).toBe('/test/');
  expect(page.getPageLinkComponentProp('isCurrent')).toBe(true);
  expect(page.getPageLinkComponentProp('as')).toBe(Link);
});
