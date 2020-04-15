import React, {
  ReactNode,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

import {
  BreakComponent as BreakComponentType,
} from '../types';

export const BreakComponent = styled.div((props) => getStyle(
  'break',

  {
    color: '#999',
    padding: '7px 14px',
  },

  props,
));

const Break: BreakComponentType = ({
  rootProps,
  children,
}) => (
  <BreakComponent
    rootProps={rootProps}
  >
    {children}
  </BreakComponent>
);

Break.propTypes = {
  rootProps: rootPropsShape.isRequired,
  children: PropTypes.node.isRequired,
};

export default Break;
