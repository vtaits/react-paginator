import type {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  BreakComponentProps,
  StylingBreakProps,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InnerBreak = styled.div<StylingBreakProps<any>>((props) => getStyle(
  'break',

  {
    color: '#999',
    padding: '7px 14px',
  },

  props,
));

export function Break<Payload>({
  rootProps,
  children,
}: BreakComponentProps<Payload>): ReactElement {
  return (
    <InnerBreak
      rootProps={rootProps}
    >
      {children}
    </InnerBreak>
  );
}
