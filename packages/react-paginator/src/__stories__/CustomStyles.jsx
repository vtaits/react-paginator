import React, { useState } from 'react';

import Paginator from '../Paginator';

const styles = {
  container: (baseStyle) => ({
    ...baseStyle,
    backgroundColor: '#EEE',
    padding: 10,
  }),

  pageLink: (baseStyle) => ({
    ...baseStyle,
    borderWidth: 0,
    marginLeft: 0,
  }),
};

const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
      styles={styles}
    />
  );
};

export default Example;
