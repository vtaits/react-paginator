import type {
  ReactElement,
} from 'react';

import type {
  RootProps,
} from '../types';

function Break(): ReactElement | null {
  return null;
}

function Container(): ReactElement | null {
  return null;
}

function Link(): ReactElement | null {
  return null;
}

function NextLink(): ReactElement | null {
  return null;
}

function PageLink(): ReactElement | null {
  return null;
}

function PageLinkGroup(): ReactElement | null {
  return null;
}

function Pages(): ReactElement | null {
  return null;
}

function PreviousLink(): ReactElement | null {
  return null;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const rootProps: RootProps<any> = {
  pageCount: 10,
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: 'previous',
  nextLabel: 'next',
  breakLabel: 'break',
  page: 3,
  onPageChange: () => undefined,
  hrefBuilder: undefined,

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
