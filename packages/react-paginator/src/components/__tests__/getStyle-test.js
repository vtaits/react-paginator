import getStyle from '../getStyle';

test('should return base state if custom style not defined', () => {
  const baseStyle = Symbol('baseStyle');

  const result = getStyle('component1', baseStyle, {
    rootProps: {
      styles: {
        component2: () => ({}),
      },
    },
  });

  expect(result).toBe(baseStyle);
});

test('should return computed style', () => {
  const computedStyle = Symbol('computedStyle');
  const styleFn = jest.fn(() => computedStyle);

  const componentProps = {
    rootProps: {
      styles: {
        component1: styleFn,
      },
    },
  };

  const baseStyle = Symbol('baseStyle');

  const result = getStyle('component1', baseStyle, componentProps);

  expect(styleFn.mock.calls.length).toBe(1);
  expect(styleFn.mock.calls[0][0]).toBe(baseStyle);
  expect(styleFn.mock.calls[0][1]).toBe(componentProps);

  expect(result).toBe(computedStyle);
});
