import type {
  ReactElement,
  ReactNode,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  ContainerComponentProps,
  RootProps,
} from '../types';

export type InnerContainerProps = {
  rootProps: RootProps;
  children?: ReactNode;
};

export const InnerContainer = styled.div<InnerContainerProps>((props) => getStyle(
  'container',

  {
    display: 'inline-flex',
  },

  props,
));

export function Container({
  rootProps,
  children,
}: ContainerComponentProps): ReactElement {
  return (
    <InnerContainer
      rootProps={rootProps}
    >
      {children}
    </InnerContainer>
  );
}
