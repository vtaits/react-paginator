import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  rootPropsShape,
} from './propTypes';

const NextLinkWrapper = memo(({
  Link,
  NextLink,
  onPageChange,
  hrefBuilder,
  nextLabel,
  page,
  pageCount,
  rootProps,
}) => {
  const isDisabled = page === pageCount;

  const onClick = (event) => {
    event.preventDefault();
    onPageChange(page + 1);
  };

  const innerProps = {};

  if (isDisabled) {
    innerProps.disabled = true;
  } else {
    innerProps.onClick = onClick;

    if (hrefBuilder) {
      innerProps.href = hrefBuilder(page + 1);
    }
  }

  return (
    <NextLink
      Link={Link}
      isDisabled={isDisabled}
      innerProps={innerProps}
      rootProps={rootProps}
    >
      {nextLabel}
    </NextLink>
  );
});

NextLinkWrapper.propTypes = {
  Link: PropTypes.elementType.isRequired,
  NextLink: PropTypes.elementType.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hrefBuilder: PropTypes.func,
  nextLabel: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  pageCount: PropTypes.number.isRequired,
  rootProps: rootPropsShape.isRequired,
};

NextLinkWrapper.defaultProps = {
  hrefBuilder: null,
};

export default NextLinkWrapper;
