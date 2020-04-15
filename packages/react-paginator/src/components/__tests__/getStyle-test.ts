import getStyle from '../getStyle';

import rootProps from '../../__fixtures__/rootProps';
import {
  CSSObject,
} from '../../types';

test('should return base state if custom style not defined', () => {
  const baseStyle: CSSObject = {
    color: '#ff0000',
  };

  const result = getStyle('break', baseStyle, {
    rootProps: {
      ...rootProps,
      styles: {
        pageLink: (): CSSObject => ({
          color: '#0000ff',
        }),
      },
    },
  });

  expect(result).toBe(baseStyle);
});

test('should return computed style', () => {
  const computedStyle: CSSObject = {
    color: '#00ff00',
  };
  const styleFn = jest.fn(() => computedStyle);

  const componentProps = {
    rootProps: {
      ...rootProps,
      styles: {
        break: styleFn,
      },
    },
  };

  const baseStyle: CSSObject = {
    color: '#ff0000',
  };

  const result = getStyle('break', baseStyle, componentProps);

  expect(styleFn.mock.calls.length).toBe(1);
  expect(styleFn.mock.calls[0][0]).toBe(baseStyle);
  expect(styleFn.mock.calls[0][1]).toBe(componentProps);

  expect(result).toBe(computedStyle);
});
