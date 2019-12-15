const getStyle = (componentName, baseStyle, componentProps) => {
  const componentStyles = componentProps.rootProps.styles[componentName];

  if (!componentStyles) {
    return baseStyle;
  }

  return componentStyles(baseStyle, componentProps);
};

export default getStyle;
