import React, { memo } from 'react';
import PropTypes from 'prop-types';

import PageLinkWrapper from './PageLinkWrapper';

import {
  rootPropsShape,
} from './propTypes';

const PageLinkGroupWrapper = memo(({
  Link,
  PageLink,
  PageLinkGroup,
  start,
  end,
  onPageChange,
  hrefBuilder,
  page,
  rootProps,
}) => {
  const renderedPages = [];
  for (let pageForLink = start; pageForLink <= end; ++pageForLink) {
    renderedPages.push(
      <PageLinkWrapper
        Link={Link}
        PageLink={PageLink}
        onPageChange={onPageChange}
        hrefBuilder={hrefBuilder}
        page={page}
        pageForLink={pageForLink}
        rootProps={rootProps}
        key={pageForLink}
      />,
    );
  }

  return (
    <PageLinkGroup
      start={start}
      end={end}
      rootProps={rootProps}
    >
      {renderedPages}
    </PageLinkGroup>
  );
});

PageLinkGroupWrapper.propTypes = {
  Link: PropTypes.elementType.isRequired,
  PageLink: PropTypes.elementType.isRequired,
  PageLinkGroup: PropTypes.elementType.isRequired,
  start: PropTypes.number.isRequired,
  end: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hrefBuilder: PropTypes.func,
  page: PropTypes.number.isRequired,
  rootProps: rootPropsShape.isRequired,
};

PageLinkGroupWrapper.defaultProps = {
  hrefBuilder: null,
};

export default PageLinkGroupWrapper;
