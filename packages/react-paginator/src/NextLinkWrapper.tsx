import React, {
  memo,
  FC,
  ReactNode,
  SyntheticEvent,
} from 'react';

import {
  OnPageChange,
  HrefBuilder,
  RootProps,
  LinkInnerProps,
  LinkComponent,
  NextLinkComponent,
} from './types';

type Props = {
  Link: LinkComponent;
  NextLink: NextLinkComponent;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  nextLabel: ReactNode;
  page: number;
  pageCount: number;
  rootProps: RootProps;
};

const NextLinkWrapper: FC<Props> = memo(({
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

  const onClick = (event: SyntheticEvent): void => {
    event.preventDefault();
    onPageChange(page + 1);
  };

  const innerProps: LinkInnerProps = {};

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

NextLinkWrapper.defaultProps = {
  hrefBuilder: null,
};

export default NextLinkWrapper;
