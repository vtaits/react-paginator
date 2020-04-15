import React from 'react';
import styled from 'styled-components';

import getStyle from './getStyle';

import {
  PreviousLinkComponent as PreviousLinkComponentType,
} from '../types';

export const PreviousLinkComponent = styled.a((props) => {
  const {
    isDisabled,
  } = props;

  return getStyle(
    'previousLink',

    {
      boxSizing: 'border-box',
      borderWidth: 0,
      fontFamily: 'Roboto,-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,sans-serif',
      fontSize: '14px',
      fontWeight: 400,
      lineHeight: '20px',
      padding: '7px 0',
      textDecoration: 'none',
      outline: 'none',
      minWidth: 40,
      textAlign: 'center',
      cursor: isDisabled ? 'default' : 'pointer',
      backgroundColor: 'transparent',
      color: isDisabled ? '#999' : '#466db5',
      paddingRight: 10,
    },

    props,
  );
});

const PreviousLink: PreviousLinkComponentType = ({
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

export default PreviousLink;
