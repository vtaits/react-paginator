import type {
  ReactElement,
} from 'react';

import type {
  RootProps,
} from '../types';

function Break(): ReactElement {
  return null;
}

function Container(): ReactElement {
  return null;
}

function Link(): ReactElement {
  return null;
}

function NextLink(): ReactElement {
  return null;
}

function PageLink(): ReactElement {
  return null;
}

function PageLinkGroup(): ReactElement {
  return null;
}

function Pages(): ReactElement {
  return null;
}

function PreviousLink(): ReactElement {
  return null;
}

export const rootProps: RootProps = {
  pageCount: 10,
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: 'previous',
  nextLabel: 'next',
  breakLabel: 'break',
  page: 3,
  onPageChange: () => undefined,
  hrefBuilder: null,

  components: {
    Break,
    Container,
    Link,
    NextLink,
    PageLink,
    PageLinkGroup,
    Pages,
    PreviousLink,
  },

  styles: {},
};
