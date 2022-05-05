import type {
  ReactElement,
  ReactNode,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  BreakComponentProps,
  RootProps,
} from '../types';

export type InnerBreakProps = {
  rootProps: RootProps;
  children?: ReactNode;
};

export const InnerBreak = styled.div<InnerBreakProps>((props) => getStyle(
  'break',

  {
    color: '#999',
    padding: '7px 14px',
  },

  props,
));

export function Break({
  rootProps,
  children,
}: BreakComponentProps): ReactElement {
  return (
    <InnerBreak
      rootProps={rootProps}
    >
      {children}
    </InnerBreak>
  );
}
