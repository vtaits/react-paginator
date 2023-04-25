import type {
  CSSObject,
  StyledProps,
} from 'styled-components';

import type {
  Styles,
  StylesParams,
} from '../types';

export function getStyle<
Payload,
ComponentName extends keyof Styles<Payload>,
>(
  componentName: ComponentName,
  baseStyle: CSSObject,
  componentProps: StyledProps<StylesParams<Payload>[ComponentName]>,
): CSSObject {
  const componentStyles = componentProps?.rootProps.styles[componentName];

  if (!componentStyles) {
    return baseStyle;
  }

  return componentStyles(baseStyle, componentProps);
}
