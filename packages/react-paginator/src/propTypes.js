import PropTypes from 'prop-types';

const componentsShape = PropTypes.shape({
  Break: PropTypes.elementType,
  Container: PropTypes.elementType,
  Link: PropTypes.elementType,
  NextLink: PropTypes.elementType,
  PageLink: PropTypes.elementType,
  PageLinkGroup: PropTypes.elementType,
  Pages: PropTypes.elementType,
  PrevoiousLink: PropTypes.elementType,
});

const stylesShape = PropTypes.shape({
  break: PropTypes.func,
  container: PropTypes.func,
  nextLink: PropTypes.func,
  pageLink: PropTypes.func,
  pageLinkGroup: PropTypes.func,
  pages: PropTypes.func,
  prevoiousLink: PropTypes.func,
});

export const paginatorPropTypes = {
  pageCount: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number,
  marginPagesDisplayed: PropTypes.number,
  previousLabel: PropTypes.node,
  nextLabel: PropTypes.node,
  breakLabel: PropTypes.node,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hrefBuilder: PropTypes.func,
  getPages: PropTypes.func,

  components: componentsShape,
  styles: stylesShape,
};

export const rootPropsShape = PropTypes.shape({
  pageCount: PropTypes.number.isRequired,
  pageRangeDisplayed: PropTypes.number.isRequired,
  marginPagesDisplayed: PropTypes.number.isRequired,
  previousLabel: PropTypes.node.isRequired,
  nextLabel: PropTypes.node.isRequired,
  breakLabel: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hrefBuilder: PropTypes.func,
  getPages: PropTypes.func,

  components: componentsShape,
  styles: stylesShape.isRequired,
});
