import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

export const PageLinkGroupComponent = styled.div((props) => getStyle(
  'pageLinkGroup',

  // TO DO
  {
    display: 'flex',
  },

  props,
));

const PageLinkGroup = ({
  rootProps,
  children,
}) => (
  <PageLinkGroupComponent
    rootProps={rootProps}
  >
    {children}
  </PageLinkGroupComponent>
);

PageLinkGroup.propTypes = {
  rootProps: rootPropsShape.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLinkGroup;
