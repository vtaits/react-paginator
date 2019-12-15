import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

export const PreviousLinkComponent = styled.a((props) => {
  const {
    isDisabled,
  } = props;

  return getStyle(
    'previousLink',

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
      marginRight: 8,
    },

    props,
  );
});

const PreviousLink = ({
  Link,
  isDisabled,
  rootProps,
  innerProps,
  children,
}) => (
  <PreviousLinkComponent
    as={Link}
    {...innerProps}
    isDisabled={isDisabled}
    rootProps={rootProps}
  >
    {children}
  </PreviousLinkComponent>
);

PreviousLink.propTypes = {
  Link: PropTypes.elementType.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  innerProps: PropTypes.objectOf(PropTypes.any).isRequired,
  rootProps: rootPropsShape.isRequired,
  children: PropTypes.node.isRequired,
};

export default PreviousLink;
