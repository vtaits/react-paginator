import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

import {
  PageLinkGroupComponent as PageLinkGroupComponentType,
} from '../types';

export const PageLinkGroupComponent = styled.div((props) => getStyle(
  'pageLinkGroup',

  {
    display: 'flex',
  },

  props,
));

const PageLinkGroup: PageLinkGroupComponentType = ({
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
