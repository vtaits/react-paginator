/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import NextLink, {
  NextLinkComponent,
} from '../NextLink';

import {
  LinkComponent,
} from '../../types';

const Link: LinkComponent = () => <div />;

type PageObject = {
  getNextLinkComponentProp: (propName: string) => any;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <NextLink
      rootProps={rootProps}
      {...props}
    />,
  );

  const getNextLinkComponent = (): ShallowWrapper => wrapper.find(NextLinkComponent);

  const getNextLinkComponentProp = (propName: string): any => getNextLinkComponent().prop(propName);

  return {
    getNextLinkComponentProp,
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
