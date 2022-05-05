import type {
  ReactElement,
  ReactNode,
} from 'react';

import styled from 'styled-components';

import { getStyle } from './getStyle';

import type {
  PageLinkGroupProps,
  RootProps,
} from '../types';

export type InnerPageLinkGroupComponentProps = {
  rootProps: RootProps;
  children?: ReactNode;
};

export const PageLinkGroupComponent = styled.div<InnerPageLinkGroupComponentProps>(
  (props) => getStyle(
    'pageLinkGroup',

    {
      display: 'flex',
    },

    props,
  ),
);

export function PageLinkGroup({
  rootProps,
  children,
}: PageLinkGroupProps): ReactElement {
  return (
    <PageLinkGroupComponent
      rootProps={rootProps}
    >
      {children}
    </PageLinkGroupComponent>
  );
}
