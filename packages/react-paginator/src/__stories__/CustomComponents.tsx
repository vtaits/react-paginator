/* eslint-disable react/prop-types, jsx-a11y/label-has-associated-control */
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
  PageLinkProps,
  Components,
} from '..';

function PageLink({
  page,
  isCurrent,
  rootProps,
}: PageLinkProps): ReactElement {
  return (
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
}

const components: Partial<Components> = {
  PageLink,
};

export function CustomComponents(): ReactElement {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
      components={components}
    />
  );
}
