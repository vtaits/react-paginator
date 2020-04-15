/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */

import React, {
  useState,
  FC,
} from 'react';

import {
  Paginator,
  PageLinkComponent,
  WeakComponents,
} from '..';

const PageLink: PageLinkComponent = ({
  page,
  isCurrent,
  rootProps,
}) => (
  <label
    style={{
      textAlign: 'center',
      padding: '0 4px',
    }}
  >
    <div>
      {page}
    </div>

    <div>
      <input
        type="radio"
        onChange={(): void => {
          rootProps.onPageChange(page);
        }}
        checked={isCurrent}
      />
    </div>
  </label>
);

const components: WeakComponents = {
  PageLink,
};

const Example: FC = () => {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
      components={components}
    />
  );
};

export default Example;
