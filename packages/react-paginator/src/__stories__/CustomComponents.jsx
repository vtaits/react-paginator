/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';

import Paginator from '../Paginator';

const PageLink = ({
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
        onChange={() => {
          rootProps.onPageChange(page);
        }}
        checked={isCurrent}
      />
    </div>
  </label>
);

const components = {
  PageLink,
};

const Example = () => {
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
