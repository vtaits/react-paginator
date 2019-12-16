import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

export const NextLinkComponent = styled.a((props) => {
  const {
    isDisabled,
  } = props;

  return getStyle(
    'nextLink',

    {
      boxSizing: 'border-box',
      borderWidth: 0,
      fontFamily: 'Roboto,-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,sans-serif',
      fontSize: '14px',
      fontWeight: '400',
      lineHeight: '20px',
      padding: '7px 0',
      textDecoration: 'none',
      outline: 'none',
      minWidth: 40,
      textAlign: 'center',
      cursor: isDisabled ? 'default' : 'pointer',
      backgroundColor: 'transparent',
      color: isDisabled ? '#999' : '#466db5',
      paddingLeft: 10,
    },

    props,
  );
});

const NextLink = ({
  Link,
  isDisabled,
  rootProps,
  innerProps,
  children,
}) => (
  <NextLinkComponent
    as={Link}
    {...innerProps}
    isDisabled={isDisabled}
    rootProps={rootProps}
  >
    {children}
  </NextLinkComponent>
);

NextLink.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  Link: PropTypes.elementType.isRequired,
  innerProps: PropTypes.objectOf(PropTypes.any).isRequired,
  rootProps: rootPropsShape.isRequired,
  children: PropTypes.node.isRequired,
};

export default NextLink;
