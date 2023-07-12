import type {
  Styles,
  StylesParams,
} from '../types';
import type {
  CSSObject,
  StyledProps,
} from '../types.styled';

export function getStyle<
Payload,
ComponentName extends keyof Styles<Payload>,
>(
  componentName: ComponentName,
  baseStyle: CSSObject,
  componentProps: StyledProps<StylesParams<Payload>[ComponentName]>,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): Record<string, any> {
  const componentStyles = componentProps?.$rootProps.styles[componentName];

  if (!componentStyles) {
    return baseStyle;
  }

  return componentStyles(baseStyle, componentProps);
}
