/* eslint-disable react/jsx-props-no-spreading */
import type {
  HTMLProps,
} from 'react';

import { createRenderer } from 'react-test-renderer/shallow';

import { rootProps } from '../../__fixtures__/rootProps';

import { Link } from '../Link';

import type {
  LinkComponentProps,
} from '../../types';

const style = {};
const className = 'test-class-name';

const defaultProps: Omit<LinkComponentProps<unknown>, 'rootProps'> = {
  children: 'test',
  style: {},
};

type PageObject = {
  getButtonProp: <Key extends keyof HTMLProps<'button'>>(
    propName: Key,
  ) => HTMLProps<'button'>[Key];

  getLinkProp: <Key extends keyof HTMLProps<'a'>>(propName: Key) => HTMLProps<'a'>[Key];
};

const setup = (props: Partial<LinkComponentProps<unknown>>): PageObject => {
  const renderer = createRenderer();

  renderer.render(
    <Link
      rootProps={rootProps}
      {...defaultProps}
      {...props}
    />,
  );

  const result = renderer.getRenderOutput();

  return {
    getButtonProp: (propName) => {
      if (result.type !== 'button') {
        throw new Error('Rendered component should be an `button` element');
      }

      return (result.props as HTMLProps<'button'>)[propName];
    },

    getLinkProp: (propName) => {
      if (result.type !== 'a') {
        throw new Error('Rendered component should be an `a` element');
      }

      return (result.props as HTMLProps<'a'>)[propName];
    },
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
