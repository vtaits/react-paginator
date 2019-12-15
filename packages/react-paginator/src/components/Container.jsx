import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

export const ContainerComponent = styled.div((props) => getStyle(
  'container',

  {
    display: 'inline-flex',
  },

  props,
));

const Container = ({
  rootProps,
  children,
}) => (
  <ContainerComponent
    rootProps={rootProps}
  >
    {children}
  </ContainerComponent>
);

Container.propTypes = {
  rootProps: rootPropsShape.isRequired,
  children: PropTypes.node.isRequired,
};

export default Container;
