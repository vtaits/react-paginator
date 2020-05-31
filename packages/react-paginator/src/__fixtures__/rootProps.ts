import type {
  BreakComponent,
  ContainerComponent,
  LinkComponent,
  NextLinkComponent,
  PageLinkComponent,
  PageLinkGroupComponent,
  PagesComponent,
  PreviousLinkComponent,
  RootProps,
} from '../types';

const Break: BreakComponent = () => null;
const Container: ContainerComponent = () => null;
const Link: LinkComponent = () => null;
const NextLink: NextLinkComponent = () => null;
const PageLink: PageLinkComponent = () => null;
const PageLinkGroup: PageLinkGroupComponent = () => null;
const Pages: PagesComponent = () => null;
const PreviousLink: PreviousLinkComponent = () => null;

const rootProps: RootProps = {
  pageCount: 10,
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: 'previous',
  nextLabel: 'next',
  breakLabel: 'break',
  page: 3,
  onPageChange: () => {},
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

export default rootProps;
