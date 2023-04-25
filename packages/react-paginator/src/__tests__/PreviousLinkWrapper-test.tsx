/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */
import type {
  FC,
  SyntheticEvent,
  ReactElement,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../__fixtures__/rootProps';

import { PreviousLinkWrapper } from '../PreviousLinkWrapper';
import type {
  PreviousLinkWrapperProps,
} from '../PreviousLinkWrapper';

import type {
  PreviousLinkProps,
} from '../types';

function Link(): ReactElement {
  return <div />;
}

function PreviousLink(): ReactElement {
  return <div />;
}

type PageObject = {
  getProp: <
  Key extends keyof PreviousLinkProps<unknown>,
  >(propName: Key) => PreviousLinkProps<unknown>[Key];
};

const defaultProps: PreviousLinkWrapperProps<unknown> = {
  Link,
  PreviousLink,
  onPageChange: (): void => undefined,
  previousLabel: 'test',
  page: 3,
  rootProps,
};

const setup = (props: Partial<PreviousLinkWrapperProps<unknown>>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <PreviousLinkWrapper
      {...defaultProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput() as ReactElement<PreviousLinkProps<unknown>, FC>;

  return {
    getProp: (propName) => result.props[propName],
  };
};

test('should render children', () => {
  const page = setup({
    previousLabel: 'prev',
  });

  expect(page.getProp('children')).toBe('prev');
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
  });

  expect(page.getProp('isDisabled')).toBe(false);
  expect(page.getProp('innerProps').disabled).toBeFalsy();
});

test('should render disabled component', () => {
  const page = setup({
    page: 1,
  });

  expect(page.getProp('isDisabled')).toBe(true);
  expect(page.getProp('innerProps').disabled).toBe(true);
});

test('should set previous page on click', () => {
  const preventDefault = jest.fn();
  const onPageChange = jest.fn();

  const page = setup({
    onPageChange,
    page: 3,
  });

  const {
    onClick,
  } = page.getProp('innerProps');

  if (!onClick) {
    throw new Error('`onClick` is not defined');
  }

  onClick({
    preventDefault,
  } as unknown as SyntheticEvent<Element, Event>);

  expect(preventDefault).toHaveBeenCalledTimes(1);

  expect(onPageChange).toHaveBeenCalledTimes(1);
  expect(onPageChange).toHaveBeenCalledWith(2);
});

test('should render disabled component', () => {
  const page = setup({
    page: 3,
    hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
  });

  expect(page.getProp('innerProps').href).toBe('/test/2/');
});
