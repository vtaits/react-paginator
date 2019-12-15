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
      borderColor: '#cccccc',
      borderWidth: 1,
      borderStyle: 'solid',
      fontFamily: 'Roboto,-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '20px',
      padding: 7,
      textDecoration: 'none',
      outline: 'none',
      minWidth: 40,
      textAlign: 'center',
      cursor: isDisabled ? 'default' : 'pointer',
      backgroundColor: '#fff',
      color: isDisabled ? '#999' : '#333',
      borderRadius: 4,
      marginLeft: 8,
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
