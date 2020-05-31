import React from 'react';
import styled from 'styled-components';

import getStyle from './getStyle';

import type {
  ContainerComponent as ContainerComponentType,
} from '../types';

export const ContainerComponent = styled.div((props) => getStyle(
  'container',

  {
    display: 'inline-flex',
  },

  props,
));

const Container: ContainerComponentType = ({
  rootProps,
  children,
}) => (
  <ContainerComponent
    rootProps={rootProps}
  >
    {children}
  </ContainerComponent>
);

export default Container;
