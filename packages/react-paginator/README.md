[![NPM](https://img.shields.io/npm/v/@vtaits/react-paginator.svg)](https://www.npmjs.com/package/@vtaits/react-paginator)

# @vtaits/react-paginator

Simple customizable pagination component for react applications.

## Abilities

- Styling and replacing components like in [react-select](https://react-select.com/styles).
- Simple usage in default theme without connecting extra styles. Only css-in-js.

## Sandbox examples

- [Simple](https://codesandbox.io/s/3cvut)
- [Few pages](https://codesandbox.io/s/rv12j)
- [Custom styles](https://codesandbox.io/s/g1358)
- [Custom components](https://codesandbox.io/s/58tvx)

## Installation

```
npm install @vtaits/react-paginator --save
```

or

```
yarn add @vtaits/react-paginator
```

## Usage

```javascript
import React, { useState } from 'react';

import { Paginator } from '@vtaits/react-paginator';

const Example = () => {
  const [page, setPage] = useState(1);

  return (
    <Paginator
      page={page}
      pageCount={15}
      onPageChange={setPage}
    />
  );
};
```

## Props

| Name | Type | Description | Default value |
|--|--|--|--|
| page | `number` | **Required**. Current page number. Starts from 1. | |
| pageCount | `number` | **Required**. The total number of pages. |  |
| onPageChange | `(nextPage: number) => void` | Callback of current page change. |  |
| pageRangeDisplayed | `number` | The range of pages displayed. | 5 |
| marginPagesDisplayed | `number` | The number of pages to display for margins. | 2 |
| previousLabel | react node | Label for the previous button. | `'prev'` |
| nextLabel | react node | Label for the next button. | `'next'` |
| breakLabel | react node | Label for break between buttons. | `'...'` |
| hrefBuilder | `(page: number) => string` | The method is called to generate the `href` attribute value on tag `a` of each page element. | `null` |
| components | `Object` | Custom components | `null` |
| styles | `Object` | Custom styles | `{}` |

## Styling

### With custom styles

Redefining like in [react-select](https://react-select.com/styles).

```javascript
import React, { useState } from 'react';

import { Paginator } from '@vtaits/react-paginator';

const styles = {
  container: (baseStyle, props) => ({
    ...baseStyle,
    backgroundColor: '#EEE',
    padding: 10,
  }),

  pageLink: (baseStyle, props) => ({
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
```

#### Style keys

- `break`
- `container`
- `nextLink`
- `pageLink`
- `pageLinkGroup`
- `pages`
- `previousLink`

### With custom components

Redefining like in [react-select](https://react-select.com/components).

```
import React, { useState } from 'react';

import { Paginator } from '@vtaits/react-paginator';

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
```

#### Components keys

- `Break`
- `Container`
- `Link`
- `NextLink`
- `PageLink`
- `PageLinkGroup`
- `Pages`
- `PreviousLink`
