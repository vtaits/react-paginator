/* eslint-disable react/jsx-props-no-spreading */
import type {
  ComponentProps,
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import {
  NextLink,
  NextLinkComponent,
} from '../NextLink';

import type {
  NextLinkProps,
} from '../../types';

function Link(): ReactElement {
  return <div />;
}

type PageObject = {
  getNextLinkComponentProp: <Key extends keyof ComponentProps<typeof NextLinkComponent>>(
    propName: Key,
  ) => ComponentProps<typeof NextLinkComponent>[Key];
};

const setup = (props: Omit<NextLinkProps<unknown>, 'rootProps'>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <NextLink
      rootProps={rootProps}
      {...props}
    />,
  );

  const result = renderer
    .getRenderOutput() as ReactElement<ComponentProps<typeof NextLinkComponent>, FC>;

  return {
    getNextLinkComponentProp: (propName) => result.props[propName],
  };
};

test('should provide correct props to NextLinkComponent', () => {
  const page = setup({
    Link,
    children: 'test',
    isDisabled: true,

    innerProps: {
      href: '/test/',
    },
  });

  expect(page.getNextLinkComponentProp('children')).toBe('test');
  expect(page.getNextLinkComponentProp('rootProps')).toBe(rootProps);
  expect(page.getNextLinkComponentProp('href')).toBe('/test/');
  expect(page.getNextLinkComponentProp('isDisabled')).toBe(true);
  expect(page.getNextLinkComponentProp('as')).toBe(Link);
});
