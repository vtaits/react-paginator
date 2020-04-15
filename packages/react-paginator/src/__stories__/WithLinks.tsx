import React, {
  useState,
  FC,
} from 'react';

import {
  Paginator,
  HrefBuilder,
} from '..';

const hrefBuilder: HrefBuilder = (page) => `/url/?page=${page}`;

const Example: FC = () => {
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
