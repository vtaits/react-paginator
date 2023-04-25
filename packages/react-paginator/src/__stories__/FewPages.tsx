import {
  useState,
} from 'react';
import type {
  ReactElement,
} from 'react';

import {
  Paginator,
} from '..';

export function FewPages(): ReactElement {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={5}
      onPageChange={setPage}
    />
  );
}
