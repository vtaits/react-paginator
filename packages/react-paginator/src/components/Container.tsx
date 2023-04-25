import type {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  ContainerComponentProps,
  StylingContainerProps,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const InnerContainer = styled.div<StylingContainerProps<any>>((props) => getStyle(
  'container',

  {
    display: 'inline-flex',
  },

  props,
));

export function Container<Payload>({
  rootProps,
  children,
}: ContainerComponentProps<Payload>): ReactElement {
  return (
    <InnerContainer
      rootProps={rootProps}
    >
      {children}
    </InnerContainer>
  );
}
