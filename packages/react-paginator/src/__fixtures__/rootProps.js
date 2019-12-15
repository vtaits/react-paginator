const rootProps = {
  pageCount: 10,
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: 'previous',
  nextLabel: 'next',
  breakLabel: 'break',
  page: 3,
  onPageChange: Function.prototype,
  hrefBuilder: null,

  components: {
    Break: () => null,
    Container: () => null,
    Link: () => null,
    NextLink: () => null,
    PageLink: () => null,
    PageLinkGroup: () => null,
    Pages: () => null,
    PrevoiousLink: () => null,
  },

  styles: {},
};

export default rootProps;
