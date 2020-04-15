/* eslint-disable react/jsx-props-no-spreading, @typescript-eslint/no-explicit-any */

import React from 'react';
import {
  shallow,
  ShallowWrapper,
} from 'enzyme';

import rootProps from '../../__fixtures__/rootProps';

import Link from '../Link';

const style = {};
const className = 'test-class-name';

const defaultProps = {
  children: 'test',
};

type PageObject = {
  getButtonProp: (propName: string) => any;
  getLinkProp: (propName: string) => any;
};

const setup = (props: Record<string, any>): PageObject => {
  const wrapper: ShallowWrapper = shallow(
    <Link
      rootProps={rootProps}
      {...defaultProps}
      {...props}
    />,
  );

  const getButtonComponent = (): ShallowWrapper => wrapper.find('button');
  const getLinkComponent = (): ShallowWrapper => wrapper.find('a');

  const getButtonProp = (propName: string): any => getButtonComponent().prop(propName);
  const getLinkProp = (propName: string): any => getLinkComponent().prop(propName);

  return {
    getButtonProp,
    getLinkProp,
  };
};

test('should render disabled button if disabled', () => {
  const page = setup({
    className,
    style,
    disabled: true,
    href: '/test/',
    onClick: jest.fn(),
  });

  expect(page.getButtonProp('className')).toBe(className);
  expect(page.getButtonProp('style')).toBe(style);
  expect(page.getButtonProp('disabled')).toBe(true);
  expect(page.getButtonProp('type')).toBe('button');
  expect(page.getButtonProp('href')).toBeFalsy();
  expect(page.getButtonProp('onClick')).toBeFalsy();
});

test('should render enabled button if href not specified', () => {
  const onClick = jest.fn();

  const page = setup({
    className,
    style,
    onClick,
  });

  expect(page.getButtonProp('className')).toBe(className);
  expect(page.getButtonProp('style')).toBe(style);
  expect(page.getButtonProp('disabled')).toBeFalsy();
  expect(page.getButtonProp('type')).toBe('button');
  expect(page.getButtonProp('href')).toBeFalsy();
  expect(page.getButtonProp('onClick')).toBe(onClick);
});

test('should render link if href specified', () => {
  const onClick = jest.fn();

  const page = setup({
    className,
    style,
    onClick,
    href: '/test/',
  });

  expect(page.getLinkProp('className')).toBe(className);
  expect(page.getLinkProp('style')).toBe(style);
  expect(page.getLinkProp('disabled')).toBeFalsy();
  expect(page.getLinkProp('href')).toBe('/test/');
  expect(page.getLinkProp('onClick')).toBe(onClick);
});
