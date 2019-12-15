import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

export const PagesComponent = styled.div((props) => getStyle(
  'pages',

  {
    display: 'flex',
    alignItems: 'center',
  },

  props,
));

const Pages = ({
  rootProps,
  children,
}) => (
  <PagesComponent
    rootProps={rootProps}
  >
    {children}
  </PagesComponent>
);

Pages.propTypes = {
  rootProps: rootPropsShape.isRequired,
  children: PropTypes.node.isRequired,
};

export default Pages;
