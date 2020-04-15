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
  PreviousLinkComponent,
} from './types';

type Props = {
  Link: LinkComponent;
  PreviousLink: PreviousLinkComponent;
  onPageChange: OnPageChange;
  hrefBuilder?: HrefBuilder;
  previousLabel: ReactNode;
  page: number;
  rootProps: RootProps;
};

const PreviousLinkWrapper: FC<Props> = memo(({
  Link,
  PreviousLink,
  onPageChange,
  hrefBuilder,
  previousLabel,
  page,
  rootProps,
}) => {
  const isDisabled: boolean = page === 1;

  const onClick = (event: SyntheticEvent): void => {
    event.preventDefault();
    onPageChange(page - 1);
  };

  const innerProps: LinkInnerProps = {};

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

PreviousLinkWrapper.defaultProps = {
  hrefBuilder: null,
};

export default PreviousLinkWrapper;
