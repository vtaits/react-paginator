/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import {
  shallow,
} from 'enzyme';
import type {
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../__fixtures__/rootProps';

import PreviousLinkWrapper from '../PreviousLinkWrapper';

import type {
  LinkComponent,
  PreviousLinkComponent,
} from '../types';

const Link: LinkComponent = () => <div />;
const PreviousLink: PreviousLinkComponent = () => <div />;

type PageObject = {
  getProp: (propName: string) => any;
};

const defaultProps = {
  Link,
  PreviousLink,
  onPageChange: (): void => {},
  previousLabel: 'test',
  page: 3,
  rootProps,
};

const setup = (props): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <PreviousLinkWrapper
      {...defaultProps}
      {...props}
    />,
  );

  const getComponent = (): ShallowWrapper => wrapper.find(PreviousLink);

  const getProp = (propName: string): any => getComponent().prop(propName);

  return {
    getProp,
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

  page.getProp('innerProps').onClick({
    preventDefault,
  });

  expect(preventDefault.mock.calls.length).toBe(1);

  expect(onPageChange.mock.calls.length).toBe(1);
  expect(onPageChange.mock.calls[0][0]).toBe(2);
});

test('should render disabled component', () => {
  const page = setup({
    page: 3,
    hrefBuilder: (pageNumber) => `/test/${pageNumber}/`,
  });

  expect(page.getProp('innerProps').href).toBe('/test/2/');
});
