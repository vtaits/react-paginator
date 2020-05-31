/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
} from 'enzyme';
import type {
  ShallowWrapper,
} from 'enzyme';

import components from '../components';

import NextLinkWrapper from '../NextLinkWrapper';
import PreviousLinkWrapper from '../PreviousLinkWrapper';
import PageLinkGroupWrapper from '../PageLinkGroupWrapper';

import {
  PAGES,
  BREAK,
} from '../constants';

import Paginator from '../Paginator';

import type {
  LinkComponent,
  PreviousLinkComponent,
  ContainerComponent,
  NextLinkComponent,
  BreakComponent,
  PageLinkComponent,
  PageLinkGroupComponent,
  GetPages,
} from '../types';

const defaultProps = {
  pageCount: 10,
  page: 3,
  onPageChange: (): void => {},
};

type PageObject = {
  wrapper: ShallowWrapper;
  getPreviousLinkWrapperProp: (propName: string) => any;
  getNextLinkWrapperProp: (propName: string) => any;
  getPageLinkGroupWrapper: () => ShallowWrapper;
  getPageLinkGroupWrapperProp: (propName: string) => any;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <Paginator
      {...defaultProps}
      {...props}
    />,
  );

  const getPreviousLinkWrapper = (): ShallowWrapper => wrapper.find(PreviousLinkWrapper);
  const getPreviousLinkWrapperProp = (
    propName: string,
  ): any => getPreviousLinkWrapper().prop(propName);

  const getNextLinkWrapper = (): ShallowWrapper => wrapper.find(NextLinkWrapper);
  const getNextLinkWrapperProp = (
    propName: string,
  ): any => getNextLinkWrapper().prop(propName);

  const getPageLinkGroupWrapper = (): ShallowWrapper => wrapper.find(PageLinkGroupWrapper);
  const getPageLinkGroupWrapperProp = (
    propName: string,
  ): any => getPageLinkGroupWrapper().prop(propName);

  return {
    wrapper,
    getPreviousLinkWrapperProp,
    getNextLinkWrapperProp,
    getPageLinkGroupWrapper,
    getPageLinkGroupWrapperProp,
  };
};

test('should render default container', () => {
  const page = setup({});

  const containerNode = page.wrapper.find(components.Container);

  expect(containerNode.prop('rootProps')).toBeTruthy();
});

test('should render redefined container', () => {
  const TestComponent: ContainerComponent = () => <div />;

  const page = setup({
    components: {
      Container: TestComponent,
    },
  });

  const containerNode = page.wrapper.find(TestComponent);

  expect(containerNode.prop('rootProps')).toBeTruthy();
});

test('should render PreviousLinkWrapper with default props', () => {
  const onPageChange = jest.fn();

  const page = setup({
    onPageChange,
  });

  expect(page.getPreviousLinkWrapperProp('Link')).toBe(components.Link);
  expect(page.getPreviousLinkWrapperProp('PreviousLink')).toBe(components.PreviousLink);
  expect(page.getPreviousLinkWrapperProp('onPageChange')).toBe(onPageChange);
  expect(page.getPreviousLinkWrapperProp('hrefBuilder')).toBeFalsy();
  expect(page.getPreviousLinkWrapperProp('previousLabel')).toBe('prev');
  expect(page.getPreviousLinkWrapperProp('page')).toBe(3);
  expect(page.getPreviousLinkWrapperProp('rootProps')).toBeTruthy();
});

test('should render PreviousLinkWrapper with redefined components', () => {
  const onPageChange = jest.fn();
  const hrefBuilder = jest.fn();

  const Link: LinkComponent = () => <div />;
  const PreviousLink: PreviousLinkComponent = () => <div />;

  const page = setup({
    onPageChange,
    hrefBuilder,

    components: {
      Link,
      PreviousLink,
    },

    previousLabel: 'previous',
  });

  expect(page.getPreviousLinkWrapperProp('Link')).toBe(Link);
  expect(page.getPreviousLinkWrapperProp('PreviousLink')).toBe(PreviousLink);
  expect(page.getPreviousLinkWrapperProp('onPageChange')).toBe(onPageChange);
  expect(page.getPreviousLinkWrapperProp('hrefBuilder')).toBe(hrefBuilder);
  expect(page.getPreviousLinkWrapperProp('previousLabel')).toBe('previous');
  expect(page.getPreviousLinkWrapperProp('page')).toBe(3);
  expect(page.getPreviousLinkWrapperProp('rootProps')).toBeTruthy();
});

test('should render NextLinkWrapper with default props', () => {
  const onPageChange = jest.fn();

  const page = setup({
    onPageChange,
  });

  expect(page.getNextLinkWrapperProp('Link')).toBe(components.Link);
  expect(page.getNextLinkWrapperProp('NextLink')).toBe(components.NextLink);
  expect(page.getNextLinkWrapperProp('onPageChange')).toBe(onPageChange);
  expect(page.getNextLinkWrapperProp('hrefBuilder')).toBeFalsy();
  expect(page.getNextLinkWrapperProp('nextLabel')).toBe('next');
  expect(page.getNextLinkWrapperProp('page')).toBe(3);
  expect(page.getNextLinkWrapperProp('rootProps')).toBeTruthy();
});

test('should render NextLinkWrapper with redefined components', () => {
  const onPageChange = jest.fn();
  const hrefBuilder = jest.fn();

  const Link: LinkComponent = () => <div />;
  const NextLink: NextLinkComponent = () => <div />;

  const page = setup({
    onPageChange,
    hrefBuilder,

    components: {
      Link,
      NextLink,
    },

    nextLabel: 'nextLabel',
  });

  expect(page.getNextLinkWrapperProp('Link')).toBe(Link);
  expect(page.getNextLinkWrapperProp('NextLink')).toBe(NextLink);
  expect(page.getNextLinkWrapperProp('onPageChange')).toBe(onPageChange);
  expect(page.getNextLinkWrapperProp('hrefBuilder')).toBe(hrefBuilder);
  expect(page.getNextLinkWrapperProp('nextLabel')).toBe('nextLabel');
  expect(page.getNextLinkWrapperProp('page')).toBe(3);
  expect(page.getNextLinkWrapperProp('rootProps')).toBeTruthy();
});

test('should render Break with default props', () => {
  const onPageChange = jest.fn();

  const getPages: GetPages = () => [
    {
      type: BREAK,
      previous: 4,
      next: 8,
    },
  ];

  const page = setup({
    onPageChange,
    getPages,
  });

  const breakNode = page.wrapper.find(components.Break);

  expect(breakNode.prop('previous')).toBe(4);
  expect(breakNode.prop('next')).toBe(8);
  expect(breakNode.prop('Link')).toBe(components.Link);
  expect(breakNode.prop('onPageChange')).toBe(onPageChange);
  expect(breakNode.prop('hrefBuilder')).toBeFalsy();
  expect(breakNode.prop('rootProps')).toBeTruthy();
});

test('should render Break with redefined props', () => {
  const onPageChange = jest.fn();
  const hrefBuilder = jest.fn();

  const Break: BreakComponent = () => <div />;
  const Link: LinkComponent = () => <div />;

  const getPages: GetPages = () => [
    {
      type: BREAK,
      previous: 4,
      next: 8,
    },
  ];

  const page = setup({
    onPageChange,
    hrefBuilder,
    getPages,

    components: {
      Break,
      Link,
    },
  });

  const breakNode = page.wrapper.find(Break);

  expect(breakNode.prop('previous')).toBe(4);
  expect(breakNode.prop('next')).toBe(8);
  expect(breakNode.prop('Link')).toBe(Link);
  expect(breakNode.prop('onPageChange')).toBe(onPageChange);
  expect(breakNode.prop('hrefBuilder')).toBe(hrefBuilder);
  expect(breakNode.prop('rootProps')).toBeTruthy();
});

test('should render PageLinkGroupWrapper with default props', () => {
  const onPageChange = jest.fn();

  const getPages: GetPages = () => [
    {
      type: PAGES,
      start: 4,
      end: 8,
    },
  ];

  const page = setup({
    onPageChange,
    getPages,
  });

  expect(page.getPageLinkGroupWrapperProp('start')).toBe(4);
  expect(page.getPageLinkGroupWrapperProp('end')).toBe(8);
  expect(page.getPageLinkGroupWrapperProp('page')).toBe(3);
  expect(page.getPageLinkGroupWrapperProp('Link')).toBe(components.Link);
  expect(page.getPageLinkGroupWrapperProp('PageLink')).toBe(components.PageLink);
  expect(page.getPageLinkGroupWrapperProp('PageLinkGroup')).toBe(components.PageLinkGroup);
  expect(page.getPageLinkGroupWrapperProp('onPageChange')).toBe(onPageChange);
  expect(page.getPageLinkGroupWrapperProp('hrefBuilder')).toBeFalsy();
  expect(page.getPageLinkGroupWrapperProp('rootProps')).toBeTruthy();
});

test('should render PageLinkGroupWrapper with redefined props', () => {
  const onPageChange = jest.fn();
  const hrefBuilder = jest.fn();

  const getPages: GetPages = () => [
    {
      type: PAGES,
      start: 4,
      end: 8,
    },
  ];

  const Link: LinkComponent = () => <div />;
  const PageLink: PageLinkComponent = () => <div />;
  const PageLinkGroup: PageLinkGroupComponent = () => <div />;

  const page = setup({
    onPageChange,
    hrefBuilder,
    getPages,

    components: {
      Link,
      PageLink,
      PageLinkGroup,
    },
  });

  expect(page.getPageLinkGroupWrapperProp('start')).toBe(4);
  expect(page.getPageLinkGroupWrapperProp('end')).toBe(8);
  expect(page.getPageLinkGroupWrapperProp('page')).toBe(3);
  expect(page.getPageLinkGroupWrapperProp('Link')).toBe(Link);
  expect(page.getPageLinkGroupWrapperProp('PageLink')).toBe(PageLink);
  expect(page.getPageLinkGroupWrapperProp('PageLinkGroup')).toBe(PageLinkGroup);
  expect(page.getPageLinkGroupWrapperProp('onPageChange')).toBe(onPageChange);
  expect(page.getPageLinkGroupWrapperProp('hrefBuilder')).toBe(hrefBuilder);
  expect(page.getPageLinkGroupWrapperProp('rootProps')).toBeTruthy();
});

test('should render multiple page groups and breaks', () => {
  const onPageChange = jest.fn();

  const getPages: GetPages = () => [
    {
      type: PAGES,
      start: 4,
      end: 8,
    },

    {
      type: BREAK,
      previous: 8,
      next: 11,
    },

    {
      type: PAGES,
      start: 11,
      end: 16,
    },
  ];

  const page = setup({
    onPageChange,
    getPages,
  });

  expect(page.getPageLinkGroupWrapper().length).toBe(2);
  expect(page.wrapper.find(components.Break).length).toBe(1);
});
