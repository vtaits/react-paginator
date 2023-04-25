import type {
  ReactElement,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  PageLinkGroupProps,
  StylingPageLinkGroupComponentProps,
} from '../types';

export const PageLinkGroupComponent = styled.div<StylingPageLinkGroupComponentProps<any>>(
  (props) => getStyle(
    'pageLinkGroup',

    {
      display: 'flex',
    },

    props,
  ),
);

export function PageLinkGroup<Payload>({
  rootProps,
  children,
}: PageLinkGroupProps<Payload>): ReactElement {
  return (
    <PageLinkGroupComponent
      rootProps={rootProps}
    >
      {children}
    </PageLinkGroupComponent>
  );
}
