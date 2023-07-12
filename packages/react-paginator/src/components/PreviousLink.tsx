import type {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  PreviousLinkProps,
  StylingPreviousLinkComponentProps,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PreviousLinkComponent = styled.a<StylingPreviousLinkComponentProps<any>>((props) => {
  const {
    $isDisabled,
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
      minWidth: '40px',
      textAlign: 'center',
      cursor: $isDisabled ? 'default' : 'pointer',
      backgroundColor: 'transparent',
      color: $isDisabled ? '#999' : '#466db5',
      paddingRight: '10px',
    },

    props,
  );
});

export function PreviousLink<Payload>({
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Link,
  isDisabled,
  rootProps,
  innerProps,
  children,
}: PreviousLinkProps<Payload>): ReactElement {
  return (
    <PreviousLinkComponent
      as={Link}
      {...innerProps}
      $isDisabled={isDisabled}
      $rootProps={rootProps}
      rootProps={rootProps}
    >
      {children}
    </PreviousLinkComponent>
  );
}
