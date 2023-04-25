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
  Styles,
  CSSObject,
} from '..';

const styles: Styles = {
  container: (baseStyle: CSSObject): CSSObject => ({
    ...baseStyle,
    backgroundColor: '#EEE',
    padding: 10,
  }),

  pageLink: (baseStyle: CSSObject): CSSObject => ({
    ...baseStyle,
    borderWidth: 0,
    marginLeft: 0,
  }),
};

export function CustomStyles(): ReactElement {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
      styles={styles}
    />
  );
}
