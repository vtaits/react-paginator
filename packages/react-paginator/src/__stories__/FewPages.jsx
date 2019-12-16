import React, { useState } from 'react';

import Paginator from '../Paginator';

const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={5}
      onPageChange={setPage}
    />
  );
};

export default Example;
