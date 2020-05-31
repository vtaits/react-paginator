/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
} from 'enzyme';
import type {
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../__fixtures__/rootProps';

import PageLinkWrapper from '../PageLinkWrapper';

import type {
  LinkComponent,
  PageLinkComponent,
} from '../types';

const Link: LinkComponent = () => <div />;
const PageLink: PageLinkComponent = () => <div />;

type PageObject = {
  getProp: (propName: string) => any;
};

const defaultProps = {
  Link,
  PageLink,
  onPageChange: (): void => {},
  page: 3,
  pageForLink: 5,
  rootProps,
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <PageLinkWrapper
      {...defaultProps}
      {...props}
    />,
  );

  const getComponent = (): ShallowWrapper => wrapper.find(PageLink);

  const getProp = (propName: string): any => getComponent().prop(propName);

  return {
    getProp,
  };
};

test('should render children', () => {
  const page = setup({
    pageForLink: 5,
  });

  expect(page.getProp('children')).toBe(5);
});

test('should provide current page', () => {
  const page = setup({
    pageForLink: 5,
  });

  expect(page.getProp('page')).toBe(5);
});

test('should provide rootProps', () => {
  const page = setup({});

  expect(page.getProp('rootProps')).toBe(rootProps);
});

test('should provide Link', () => {
  const page = setup({});

  expect(page.getProp('Link')).toBe(Link);
});

test('should render enabled component', () => {
  const page = setup({
    page: 3,
    pageForLink: 10,
  });

  expect(page.getProp('isCurrent')).toBe(false);
  expect(page.getProp('innerProps').disabled).toBeFalsy();
});

test('should render disabled component', () => {
  const page = setup({
    page: 3,
    pageForLink: 3,
  });

  expect(page.getProp('isCurrent')).toBe(true);
  expect(page.getProp('innerProps').disabled).toBe(true);
});

test('should set next page on click', () => {
  const preventDefault = jest.fn();
  const onPageChange = jest.fn();

  const page = setup({
    onPageChange,
    page: 3,
    pageForLink: 5,
  });

  page.getProp('innerProps').onClick({
    preventDefault,
  });

  expect(preventDefault.mock.calls.length).toBe(1);

  expect(onPageChange.mock.calls.length).toBe(1);
  expect(onPageChange.mock.calls[0][0]).toBe(5);
});

test('should render disabled component', () => {
  const page = setup({
    page: 3,
    pageForLink: 5,
    hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
  });

  expect(page.getProp('innerProps').href).toBe('/test/5/');
});
