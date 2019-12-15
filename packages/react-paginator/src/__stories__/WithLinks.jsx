import React, { useState } from 'react';

import Paginator from '../Paginator';

const hrefBuilder = (page) => `/url/?page=${page}`;

const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
      hrefBuilder={hrefBuilder}
    />
  );
};

export default Example;
