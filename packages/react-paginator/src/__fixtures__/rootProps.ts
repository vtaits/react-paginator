import {
  RootProps,
} from '../types';

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
    Break: () => null,
    Container: () => null,
    Link: () => null,
    NextLink: () => null,
    PageLink: () => null,
    PageLinkGroup: () => null,
    Pages: () => null,
    PreviousLink: () => null,
  },

  styles: {},
};

export default rootProps;
