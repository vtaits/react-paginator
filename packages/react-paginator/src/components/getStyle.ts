import {
  RootProps,
  CSSObject,
} from '../types';

const getStyle = (
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

export default getStyle;
