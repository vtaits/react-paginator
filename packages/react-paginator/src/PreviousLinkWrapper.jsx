import React, { memo } from 'react';
import PropTypes from 'prop-types';

import {
  rootPropsShape,
} from './propTypes';

const PreviousLinkWrapper = memo(({
  Link,
  PreviousLink,
  onPageChange,
  hrefBuilder,
  previousLabel,
  page,
  rootProps,
}) => {
  const isDisabled = page === 1;

  const onClick = (event) => {
    event.preventDefault();
    onPageChange(page - 1);
  };

  const innerProps = {};

  if (isDisabled) {
    innerProps.disabled = true;
  } else {
    innerProps.onClick = onClick;

    if (hrefBuilder) {
      innerProps.href = hrefBuilder(page - 1);
    }
  }

  return (
    <PreviousLink
      Link={Link}
      isDisabled={isDisabled}
      innerProps={innerProps}
      rootProps={rootProps}
    >
      {previousLabel}
    </PreviousLink>
  );
});

PreviousLinkWrapper.propTypes = {
  Link: PropTypes.elementType.isRequired,
  PreviousLink: PropTypes.elementType.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hrefBuilder: PropTypes.func,
  previousLabel: PropTypes.node.isRequired,
  page: PropTypes.number.isRequired,
  rootProps: rootPropsShape.isRequired,
};

PreviousLinkWrapper.defaultProps = {
  hrefBuilder: null,
};

export default PreviousLinkWrapper;
