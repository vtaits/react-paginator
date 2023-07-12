import type {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  PagesProps,
  StylingPagesComponentProps,
} from '../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const PagesComponent = styled.div<StylingPagesComponentProps<any>>((props) => getStyle(
  'pages',

  {
    display: 'flex',
    alignItems: 'center',
  },

  props,
));

export function Pages<Payload>({
  rootProps,
  children,
}: PagesProps<Payload>): ReactElement {
  return (
    <PagesComponent
      $rootProps={rootProps}
    >
      {children}
    </PagesComponent>
  );
}
