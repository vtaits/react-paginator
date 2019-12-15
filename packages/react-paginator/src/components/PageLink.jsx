import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import getStyle from './getStyle';
import {
  rootPropsShape,
} from '../propTypes';

export const PageLinkComponent = styled.a((props) => {
  const {
    isCurrent,
  } = props;

  return getStyle(
    'pageLink',

    {
      boxSizing: 'border-box',
      borderColor: '#cccccc',
      borderLeftWidth: 1,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderRightWidth: 0,
      borderStyle: 'solid',
      color: '#333',
      fontFamily: 'Roboto,-apple-system,BlinkMacSystemFont,\'Helvetica Neue\',Helvetica,sans-serif',
      fontSize: '16px',
      fontWeight: '400',
      lineHeight: '20px',
      padding: 7,
      textDecoration: 'none',
      outline: 'none',
      minWidth: 40,
      textAlign: 'center',
      cursor: isCurrent ? 'default' : 'pointer',
      backgroundColor: isCurrent ? '#d6e8ff' : '#fff',

      ':first-child': {
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
      },

      ':last-child': {
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,
        borderRightWidth: 1,
      },
    },

    props,
  );
});

const PageLink = ({
  Link,
  isCurrent,
  rootProps,
  innerProps,
  children,
}) => (
  <PageLinkComponent
    as={Link}
    {...innerProps}
    isCurrent={isCurrent}
    rootProps={rootProps}
  >
    {children}
  </PageLinkComponent>
);

PageLink.propTypes = {
  Link: PropTypes.elementType.isRequired,
  isCurrent: PropTypes.bool.isRequired,
  innerProps: PropTypes.objectOf(PropTypes.any).isRequired,
  rootProps: rootPropsShape.isRequired,
  children: PropTypes.node.isRequired,
};

export default PageLink;
