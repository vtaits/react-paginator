import {
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

export type PageLinkWrapperProps = {
  Link: LinkComponent;
  PageLink: PageLinkComponent;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  page: number;
  pageForLink: number;
  rootProps: RootProps;
};

export const PageLinkWrapper: FC<PageLinkWrapperProps> = memo(({
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
  Link,
  /* eslint-disable-next-line @typescript-eslint/naming-convention */
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
