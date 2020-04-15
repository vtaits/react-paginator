import {
  RootProps,
} from '../types';

const getStyle = (
  componentName: string,
  baseStyle: Object,
  componentProps: {
    rootProps: RootProps;
  },
): Object => {
  const componentStyles = componentProps.rootProps.styles[componentName];

  if (!componentStyles) {
    return baseStyle;
  }

  return componentStyles(baseStyle, componentProps);
};

export default getStyle;
