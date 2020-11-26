import styled from 'styled-components';

import getStyle from './getStyle';

import type {
  PageLinkGroupComponent as PageLinkGroupComponentType,
} from '../types';

export const PageLinkGroupComponent = styled.div((props) => getStyle(
  'pageLinkGroup',

  {
    display: 'flex',
  },

  props,
));

const PageLinkGroup: PageLinkGroupComponentType = ({
  rootProps,
  children,
}) => (
  <PageLinkGroupComponent
    rootProps={rootProps}
  >
    {children}
  </PageLinkGroupComponent>
);

export default PageLinkGroup;
