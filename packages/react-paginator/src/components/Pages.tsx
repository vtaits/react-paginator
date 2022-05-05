import type {
  ReactElement,
  ReactNode,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  PagesProps,
  RootProps,
} from '../types';

export type InnerPagesComponentProps = {
  rootProps: RootProps;
  children?: ReactNode;
};

export const PagesComponent = styled.div<InnerPagesComponentProps>((props) => getStyle(
  'pages',

  {
    display: 'flex',
    alignItems: 'center',
  },

  props,
));

export function Pages({
  rootProps,
  children,
}: PagesProps): ReactElement {
  return (
    <PagesComponent
      rootProps={rootProps}
    >
      {children}
    </PagesComponent>
  );
}
