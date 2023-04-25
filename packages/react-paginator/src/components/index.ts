import type {
  Components,
} from '../types';

import { Break } from './Break';
import { Container } from './Container';
import { Link } from './Link';
import { NextLink } from './NextLink';
import { PageLink } from './PageLink';
import { PageLinkGroup } from './PageLinkGroup';
import { Pages } from './Pages';
import { PreviousLink } from './PreviousLink';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const components: Components<any> = {
  Break,
  Container,
  Link,
  NextLink,
  PageLink,
  PageLinkGroup,
  Pages,
  PreviousLink,
};
