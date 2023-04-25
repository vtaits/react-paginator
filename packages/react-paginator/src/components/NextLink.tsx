import type {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  NextLinkProps,
  StylingNextLinkComponentProps,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const NextLinkComponent = styled.a<StylingNextLinkComponentProps<any>>((props) => {
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
      paddingLeft: 10,
    },

    props,
  );
});

export function NextLink<Payload>({
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Link,
  isDisabled,
  rootProps,
  innerProps,
  children,
}: NextLinkProps<Payload>): ReactElement {
  return (
    <NextLinkComponent
      as={Link}
      {...innerProps}
      isDisabled={isDisabled}
      rootProps={rootProps}
    >
      {children}
    </NextLinkComponent>
  );
}
