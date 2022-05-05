import type {
  CSSObject,
} from 'styled-components';

import type {
  RootProps,
} from '../types';

export const getStyle = (
  componentName: string,
  baseStyle: CSSObject,
  componentProps: {
    rootProps: RootProps;
  },
): CSSObject => {
  const componentStyles = componentProps.rootProps.styles[componentName];

  if (!componentStyles) {
    return baseStyle;
  }

  return componentStyles(baseStyle, componentProps);
};
