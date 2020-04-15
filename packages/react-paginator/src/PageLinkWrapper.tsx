import React, {
  memo,
  FC,
  ComponentType,
  SyntheticEvent,
} from 'react';
import PropTypes from 'prop-types';

import {
  rootPropsShape,
} from './propTypes';

import {
  OnPageChange,
  HrefBuilder,
  RootProps,
  LinkInnerProps,
  LinkComponent,
  PageLinkComponent,
} from './types';

type Props = {
  Link: LinkComponent;
  PageLink: PageLinkComponent;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  page: number;
  pageForLink: number;
  rootProps: RootProps;
};

const PageLinkWrapper: FC<Props> = memo(({
  Link,
  PageLink,
  onPageChange,
  hrefBuilder,
  page,
  pageForLink,
  rootProps,
}) => {
  const isCurrent = page === pageForLink;

  const onClick = (event: SyntheticEvent): void => {
    event.preventDefault();
    onPageChange(pageForLink);
  };

  const innerProps: LinkInnerProps = {};

  if (isCurrent) {
    innerProps.disabled = true;
  } else {
    innerProps.onClick = onClick;

    if (hrefBuilder) {
      innerProps.href = hrefBuilder(pageForLink);
    }
  }

  return (
    <PageLink
      Link={Link}
      isCurrent={isCurrent}
      innerProps={innerProps}
      rootProps={rootProps}
      page={pageForLink}
    >
      {pageForLink}
    </PageLink>
  );
});

PageLinkWrapper.propTypes = {
  Link: PropTypes.elementType.isRequired,
  PageLink: PropTypes.elementType.isRequired,
  onPageChange: PropTypes.func.isRequired,
  hrefBuilder: PropTypes.func,
  page: PropTypes.number.isRequired,
  pageForLink: PropTypes.number.isRequired,
  rootProps: rootPropsShape.isRequired,
};

PageLinkWrapper.defaultProps = {
  hrefBuilder: null,
};

export default PageLinkWrapper;
