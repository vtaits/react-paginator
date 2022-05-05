import {
  useState,
} from 'react';
import type {
  ReactElement,
} from 'react';

import {
  Paginator,
} from '..';
import type {
  HrefBuilder,
} from '..';

const hrefBuilder: HrefBuilder = (page) => `/url/?page=${page}`;

function Example(): ReactElement {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
      hrefBuilder={hrefBuilder}
    />
  );
}

export default Example;
