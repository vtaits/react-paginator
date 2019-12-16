import React from 'react';
import { shallow } from 'enzyme';

import components from '../components';

import NextLinkWrapper from '../NextLinkWrapper';
import PreviousLinkWrapper from '../PreviousLinkWrapper';
import PageLinkGroupWrapper from '../PageLinkGroupWrapper';

import {
  PAGES,
  BREAK,
} from '../constants';

import Paginator from '../Paginator';

const defaultProps = {
  pageCount: 10,
  page: 3,
  onPageChange: Function.prototype,
};

const setup = (props) => {
  const wrapper = shallow(
    <Paginator
      {...defaultProps}
      {...props}
    />,
  );

  const getPreviousLinkWrapper = () => wrapper.find(PreviousLinkWrapper);
  const getPreviousLinkWrapperProp = (propName) => getPreviousLinkWrapper().prop(propName);

  const getNextLinkWrapper = () => wrapper.find(NextLinkWrapper);
  const getNextLinkWrapperProp = (propName) => getNextLinkWrapper().prop(propName);

  const getPageLinkGroupWrapper = () => wrapper.find(PageLinkGroupWrapper);
  const getPageLinkGroupWrapperProp = (propName) => getPageLinkGroupWrapper().prop(propName);

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
  const TestComponent = () => <div />;

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

  const Link = () => <div />;
  const PreviousLink = () => <div />;

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

  const Link = () => <div />;
  const NextLink = () => <div />;

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

  const getPages = () => [
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

  const Break = () => <div />;
  const Link = () => <div />;

  const getPages = () => [
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

  const getPages = () => [
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

  const getPages = () => [
    {
      type: PAGES,
      start: 4,
      end: 8,
    },
  ];

  const Link = () => <div />;
  const PageLink = () => <div />;
  const PageLinkGroup = () => <div />;

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

  const getPages = () => [
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
