/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */
import type {
  FC,
  SyntheticEvent,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../__fixtures__/rootProps';

import { PageLinkWrapper } from '../PageLinkWrapper';
import type {
  PageLinkWrapperProps,
} from '../PageLinkWrapper';

import type {
  PageLinkProps,
} from '../types';

function Link(): ReactElement {
  return <div />;
}

function PageLink(): ReactElement {
  return <div />;
}

type PageObject = {
  getProp: <Key extends keyof PageLinkProps>(propName: Key) => PageLinkProps[Key];
};

const defaultProps: PageLinkWrapperProps = {
  Link,
  PageLink,
  onPageChange: (): void => undefined,
  page: 3,
  pageForLink: 5,
  rootProps,
};

const setup = (props: Partial<PageLinkWrapperProps>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <PageLinkWrapper
      {...defaultProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<PageLinkProps, FC>;

  return {
    getProp: (propName) => result.props[propName],
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
  } as unknown as SyntheticEvent<Element, Event>);

  expect(preventDefault).toHaveBeenCalledTimes(1);

  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(5);
});

test('should render disabled component', () => {
  const page = setup({
    page: 3,
    pageForLink: 5,
    hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
  });

  expect(page.getProp('innerProps').href).toBe('/test/5/');
});
