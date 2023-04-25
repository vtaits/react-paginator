/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */
import type {
  FC,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { components } from '../components';

import type {
  NextLinkWrapperProps,
} from '../NextLinkWrapper';
import type {
  PreviousLinkWrapperProps,
} from '../PreviousLinkWrapper';
import { PageLinkGroupWrapper } from '../PageLinkGroupWrapper';
import type {
  PageLinkGroupWrapperProps,
} from '../PageLinkGroupWrapper';

import {
  PAGES,
  BREAK,
} from '../constants';

import { Paginator } from '../Paginator';

import type {
  BreakComponentProps,
  ContainerComponentProps,
  PagesProps,
  GetPages,
} from '../types';

const defaultProps = {
  pageCount: 10,
  page: 3,
  onPageChange: (): void => {},
};

type PageObject = {
  getRootNode: () => ReactElement<ContainerComponentProps<unknown>, FC>;

  getPreviousLinkWrapperProp: <Key extends keyof PreviousLinkWrapperProps<unknown>>(
    propName: Key,
  ) => PreviousLinkWrapperProps<unknown>[Key];

  getNextLinkWrapperProp: <Key extends keyof NextLinkWrapperProps<unknown>>(
    propName: Key,
  ) => NextLinkWrapperProps<unknown>[Key];

  getRenderedPages: () => Array<ReactElement>;
};

const setup = (props: Record<string, any>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <Paginator
      {...defaultProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<ContainerComponentProps<unknown>, FC>;

  const getChildren = () => {
    const {
      children,
    } = result.props;

    if (!Array.isArray(children)) {
      throw new Error('`children` is not an array');
    }

    return children;
  };

  const getPreviousLinkWrapper = () => getChildren()[0] as ReactElement<
  PreviousLinkWrapperProps<unknown>,
  FC
  >;

  const getNextLinkWrapper = () => getChildren()[2] as ReactElement<
  NextLinkWrapperProps<unknown>,
  FC
  >;

  const getPagesNode = () => getChildren()[1] as ReactElement<
  PagesProps<unknown>,
  FC
  >;

  const getRenderedPages = () => getPagesNode().props.children as Array<ReactElement>;

  return {
    getRootNode: () => result,

    getPreviousLinkWrapperProp: (propName) => getPreviousLinkWrapper().props[propName],

    getNextLinkWrapperProp: (propName) => getNextLinkWrapper().props[propName],

    getRenderedPages,
  };
};

test('should render default container', () => {
  const page = setup({});

  const containerNode = page.getRootNode();

  expect(containerNode.type).toBe(components.Container);
  expect(containerNode.props.rootProps).toBeTruthy();
});

test('should render redefined container', () => {
  function TestComponent(): ReactElement {
    return <div />;
  }

  const page = setup({
    components: {
      Container: TestComponent,
    },
  });

  const containerNode = page.getRootNode();

  expect(containerNode.type).toBe(TestComponent);
  expect(containerNode.props.rootProps).toBeTruthy();
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

  function Link(): ReactElement {
    return <div />;
  }

  function PreviousLink(): ReactElement {
    return <div />;
  }

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

  function Link(): ReactElement {
    return <div />;
  }

  function NextLink(): ReactElement {
    return <div />;
  }

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

  const breakNode = page.getRenderedPages()[0] as ReactElement<BreakComponentProps<unknown>, FC>;

  expect(breakNode.type).toBe(components.Break);

  expect(breakNode.props.previous).toBe(4);
  expect(breakNode.props.next).toBe(8);
  expect(breakNode.props.Link).toBe(components.Link);
  expect(breakNode.props.onPageChange).toBe(onPageChange);
  expect(breakNode.props.hrefBuilder).toBeFalsy();
  expect(breakNode.props.rootProps).toBeTruthy();
});

test('should render Break with redefined props', () => {
  const onPageChange = jest.fn();
  const hrefBuilder = jest.fn();

  function Break(): ReactElement {
    return <div />;
  }

  function Link(): ReactElement {
    return <div />;
  }

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

  const breakNode = page.getRenderedPages()[0] as ReactElement<BreakComponentProps<unknown>, FC>;

  expect(breakNode.type).toBe(Break);

  expect(breakNode.props.previous).toBe(4);
  expect(breakNode.props.next).toBe(8);
  expect(breakNode.props.Link).toBe(Link);
  expect(breakNode.props.onPageChange).toBe(onPageChange);
  expect(breakNode.props.hrefBuilder).toBe(hrefBuilder);
  expect(breakNode.props.rootProps).toBeTruthy();
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

  const groupWrapperNode = page
    .getRenderedPages()[0] as ReactElement<PageLinkGroupWrapperProps<unknown>, FC>;

  expect(groupWrapperNode.type).toBe(PageLinkGroupWrapper);

  expect(groupWrapperNode.props.start).toBe(4);
  expect(groupWrapperNode.props.end).toBe(8);
  expect(groupWrapperNode.props.page).toBe(3);
  expect(groupWrapperNode.props.Link).toBe(components.Link);
  expect(groupWrapperNode.props.PageLink).toBe(components.PageLink);
  expect(groupWrapperNode.props.PageLinkGroup).toBe(components.PageLinkGroup);
  expect(groupWrapperNode.props.onPageChange).toBe(onPageChange);
  expect(groupWrapperNode.props.hrefBuilder).toBeFalsy();
  expect(groupWrapperNode.props.rootProps).toBeTruthy();
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

  function Link(): ReactElement {
    return <div />;
  }

  function PageLink(): ReactElement {
    return <div />;
  }

  function PageLinkGroup(): ReactElement {
    return <div />;
  }

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

  const groupWrapperNode = page
    .getRenderedPages()[0] as ReactElement<PageLinkGroupWrapperProps<unknown>, FC>;

  expect(groupWrapperNode.type).toBe(PageLinkGroupWrapper);

  expect(groupWrapperNode.props.start).toBe(4);
  expect(groupWrapperNode.props.end).toBe(8);
  expect(groupWrapperNode.props.page).toBe(3);
  expect(groupWrapperNode.props.Link).toBe(Link);
  expect(groupWrapperNode.props.PageLink).toBe(PageLink);
  expect(groupWrapperNode.props.PageLinkGroup).toBe(PageLinkGroup);
  expect(groupWrapperNode.props.onPageChange).toBe(onPageChange);
  expect(groupWrapperNode.props.hrefBuilder).toBe(hrefBuilder);
  expect(groupWrapperNode.props.rootProps).toBeTruthy();
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

  const renderedPages = page.getRenderedPages();

  expect(renderedPages.length).toBe(3);

  expect(renderedPages[0].type).toBe(PageLinkGroupWrapper);
  expect(renderedPages[1].type).toBe(components.Break);
  expect(renderedPages[2].type).toBe(PageLinkGroupWrapper);
});
