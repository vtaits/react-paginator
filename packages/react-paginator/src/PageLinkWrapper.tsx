import React, {
  memo,
} from 'react';
import type {
  FC,
  SyntheticEvent,
} from 'react';

import type {
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

PageLinkWrapper.defaultProps = {
  hrefBuilder: null,
};

export default PageLinkWrapper;
