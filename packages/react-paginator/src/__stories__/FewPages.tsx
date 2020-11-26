import {
  useState,
  FC,
} from 'react';

import {
  Paginator,
} from '..';

const Example: FC = () => {
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
