/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import PageLink, {
  PageLinkComponent,
} from '../PageLink';

import type {
  LinkComponent,
  PageLinkProps,
} from '../../types';

const Link: LinkComponent = () => <div />;

type PageObject = {
  getPageLinkComponentProp: (propName: string) => any;
};

const setup = (props: Omit<PageLinkProps, 'rootProps' | 'Link'>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <PageLink
      rootProps={rootProps}
      Link={Link}
      {...props}
    />,
  );

  const getPageLinkComponent = (): ShallowWrapper => wrapper.find(PageLinkComponent);

  const getPageLinkComponentProp = (propName: string): any => getPageLinkComponent().prop(propName);

  return {
    getPageLinkComponentProp,
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
